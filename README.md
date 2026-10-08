# dev-typenow

陈应帅的个人作品集站，部署在 https://dev.typenow.cn 。

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:3001
```

## 测试

```bash
pnpm test         # 内容守卫 + 联系方式拼接
npx tsc --noEmit
pnpm run lint
```

26 条用例，覆盖两类真实会出错的地方：

- **内容完整性**（20 条）：心路历程字段与年份递增、描述长度区间、技术栈年限越界与重复项、项目五段齐全、每条取舍必须写明代价、定位句必须两段拼完整。
- **隐私守卫**（6 条）：`revealContact()` 拼接，以及渲染产物中不得出现完整手机号/邮箱。

## 部署

```bash
su - admin -c '/home/admin/dev-typenow/deploy.sh'
```

必须在 **admin** 用户下运行——pm2 空间属于 admin，以 root 执行会操作到空的 pm2 空间。

部署脚本会构建到 `.next-staging`（由 `next.config.ts` 读取 `DEV_TYPENOW_DIST_DIR` 重定向），校验 `BUILD_ID` 与 `server/` 后原子替换 `.next`，上一版保留为 `.next-prev`。

### 服务器换新后要补的两件事

这两项是**服务器状态**，不在仓库里，重建机器时必须手工重做：

1. **pm2 开机自启**（当前服务器已完成）：

   ```bash
   pm2 startup systemd -u admin --hp /home/admin   # 按提示以 root 执行
   su - admin -c 'pm2 save'
   ```

   没有这一步，机器重启后 `dev-typenow` 不会自动回来，站点静默 502。

2. **nginx 配置** `/etc/nginx/conf.d/dev-typenow.conf` —— 反代 `127.0.0.1:3001`，
   并保留 `location /.well-known/acme-challenge/ { root /usr/share/nginx/html; }`
   （证书自动续期依赖它，删掉后 90 天证书静默过期）。
   注意 nginx 1.14.1 **不支持** `http2 on;`，必须写 `listen 443 ssl http2;`。

   证书是**独立的一份**（`/etc/letsencrypt/live/dev.typenow.cn/`，`authenticator = webroot`），
   与老站的 `typenow.cn` 证书互相独立，改动其一时不会波及另一个。

## 内容维护

所有文案在 `src/content/` 下的类型化常量里，改文案不需要碰组件：

- `profile.ts` — 姓名、定位句、首屏四个数字
- `journey.ts` — 心路历程五个节点
- `projects.ts` — 两个重点项目与三条次要经历
- `stack.ts` — 技术栈五组
- `contact.ts` — 联系方式碎片（**改这里要留意隐私守卫测试**）

修改后跑 `pnpm test`——内容守卫会拦住漏字段、年限越界、取舍没写代价这类错误。

## 联系方式隐私

完整手机号不在源码、构建产物或服务端渲染的 HTML 中出现。号码以碎片形式存放在 `src/content/contact.ts`，只在用户点击「查看联系方式」后由客户端拼接。

验证不变量（结果应为 0）：

```bash
FULL_PHONE=$(node -e 'process.stdout.write(["166","3448","2010"].join(""))')
grep -rn "$FULL_PHONE" src/ .next/static .next/server/app
```

邮箱复用同一份手机号碎片，只多一个 `EMAIL_DOMAIN` 后缀。**不要**把邮箱写成 `["<完整号码>", "@163.com"]`——那等于明文存放，防护会失效。
