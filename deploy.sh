#!/bin/bash
set -eo pipefail

# ─────────────────────────────────────────────────────────────
# 必须以 admin 身份运行。线上应用跑在 admin 的 pm2 空间
# （/home/admin/.pm2）。以 root 跑会操作 root 自己的空空间，
# `pm2 restart dev-typenow` 看似成功却没碰到真实进程。
# 正确用法：su - admin -c '/home/admin/dev-typenow/deploy.sh'
# ─────────────────────────────────────────────────────────────
EXPECTED_USER="admin"
if [ "$(whoami)" != "$EXPECTED_USER" ]; then
  echo "错误：必须以 $EXPECTED_USER 身份运行（当前为 $(whoami)）。" >&2
  echo "正确用法：su - $EXPECTED_USER -c '$0'" >&2
  exit 1
fi

# 与 TypeNow 用不同的锁文件：两个站可以并行部署互不阻塞
LOCK_FILE="/tmp/dev-typenow-deploy.lock"
exec 200>"$LOCK_FILE"
if ! flock -w 900 200; then
  echo "错误：等待其他部署超时（超过 15 分钟），本次取消。" >&2
  exit 1
fi

PROJECT_DIR="/home/admin/dev-typenow"
LOG_FILE="$PROJECT_DIR/deploy.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

cd "$PROJECT_DIR"
log "=== 开始部署 ==="

# 拉取带重试：webhook 只触发一次且无补偿，一次网络抖动就静默漏掉一次发布
PULL_DONE=0
for attempt in 1 2 3 4 5; do
  if git pull --ff-only origin main 2>&1 | tee -a "$LOG_FILE"; then
    PULL_DONE=1
    break
  fi
  log "第 ${attempt} 次拉取失败，$((attempt * 15)) 秒后重试..."
  sleep $((attempt * 15))
done
if [ "$PULL_DONE" != "1" ]; then
  log "错误：连续 5 次拉取均失败，本次部署取消（线上维持原版本）"
  exit 1
fi
log "已同步到：$(git log -1 --format='%h %ci %s')"

# CI=true：非交互环境下 pnpm 会因缺 TTY 中止清空 node_modules
log "安装依赖..."
CI=true pnpm install --frozen-lockfile 2>&1 | tee -a "$LOG_FILE"

# ─────────────────────────────────────────────────────────────
# 构建到暂存目录，成功后再原子替换 .next。
# next.config.ts 读 DEV_TYPENOW_DIST_DIR 决定 distDir；
# 不导出这个变量的话 next build 会构建到 .next（就地覆写），
# 下面的产物校验必然失败并中止——这正是 TypeNow 的踩坑点。
# 暂存目录用固定名：带 PID 会让 next build 往 tsconfig.json 塞不同路径，
# 工作区变脏后 git pull 可能失败。同一时刻只有一个部署（上面有 flock）。
# ─────────────────────────────────────────────────────────────
log "构建项目..."
rm -rf .next-staging
STAGING_DIR=".next-staging"
export DEV_TYPENOW_DIST_DIR="$STAGING_DIR"

# 构建前清掉上一次部署遗留的生成类型目录。
# tsconfig 同时 include 了 .next/types 与 .next-staging/types（后者由 next build 追加）。
# .next/types 是上次成功部署的产物，其 validator.ts 会 import 当时存在的每个路由；
# 本次若删除或重命名了任何路由，旧 validator 会引用已不存在的模块，构建期
# `Running TypeScript ...` 直接失败，并且会自锁（失败 → .next 不被替换 → 旧类型永在）。
# 这些生成类型只服务构建期类型检查，next start 不读它们。
rm -rf .next/types .next/dev/types

if ! pnpm run build 2>&1 | tee -a "$LOG_FILE"; then
  log "错误：构建失败，本次部署取消。线上 .next 未被触碰。"
  rm -rf "$STAGING_DIR"
  exit 1
fi
unset DEV_TYPENOW_DIST_DIR

# BUILD_ID 与 server/ 是 next start 的必需产物，缺任意一个都说明构建没走完
if [ ! -f "$STAGING_DIR/BUILD_ID" ] || [ ! -d "$STAGING_DIR/server" ]; then
  log "错误：构建产物不完整（缺少 $STAGING_DIR/BUILD_ID 或 $STAGING_DIR/server），本次部署取消。线上 .next 未被触碰。"
  rm -rf "$STAGING_DIR"
  exit 1
fi

if ! pm2 describe dev-typenow > /dev/null 2>&1; then
  log "错误：当前用户（$(whoami)）的 pm2 中不存在 dev-typenow 进程，已中止"
  rm -rf "$STAGING_DIR"
  exit 1
fi

log "替换构建产物：$STAGING_DIR → .next（上一版保留为 .next-prev）"
rm -rf .next-prev
# 写成 if 而不是 `[ -e .next ] && mv ...`：后者在 .next 不存在时返回 1，
# 在 set -e 下会直接终止脚本
if [ -e .next ]; then
  mv .next .next-prev
fi
mv "$STAGING_DIR" .next

log "重启 PM2..."
pm2 restart dev-typenow 2>&1 | tee -a "$LOG_FILE"

log "=== 部署完成 ==="
