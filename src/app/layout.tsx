import type { Metadata } from "next"
import "./globals.css"
import { profile } from "@/content/profile"
import { SiteFooter } from "@/components/SiteFooter"

// 定位句是 headline + headlineAccent 拼起来的完整一句。只取 headline 会得到
// 「从写页面，到」这种半句——分享到微信或出现在搜索结果里，显示的就是这句残句。
const positioning = `${profile.headline}${profile.headlineAccent}`
const description = `${positioning}。${profile.intro}`

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description,
  metadataBase: new URL("https://dev.typenow.cn"),
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description,
    type: "profile",
    locale: "zh_CN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
