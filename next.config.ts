import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // 构建目录可被部署脚本重定向，用于「构建到暂存目录再原子切换」。
  // deploy.sh 会导出 DEV_TYPENOW_DIST_DIR=.next-staging，构建完再 rename 成 .next。
  //
  // 为什么必须由配置读取、而不是直接 `next build` 到 .next：
  // 就地构建一旦中途失败会留下写坏一半的产物，用户请求到未加载的 chunk 就 404，
  // 失败会从「发布没生效」升级成「线上报错」。
  // 注意：不要在这里写 output: "export"，静态导出不产出 Node 服务端，
  // 会让部署方式依赖的 `next start` 完全不可用。
  distDir: process.env.DEV_TYPENOW_DIST_DIR || ".next",
}

export default nextConfig
