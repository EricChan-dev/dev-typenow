import type { Metadata } from "next"
import "./globals.css"
import { profile } from "@/content/profile"
import { SiteFooter } from "@/components/SiteFooter"
import { SideNav } from "@/components/Glass"

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
        <SideNav name={profile.name} role={profile.role} />
        {/* lg 以上给左侧固定导航留出 14rem（w-56），否则内容会被导航压住 */}
        <div className="mx-auto max-w-5xl lg:pl-60">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
