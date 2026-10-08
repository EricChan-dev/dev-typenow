import type { Metadata } from "next"
import "./globals.css"
import { profile } from "@/content/profile"
import { SiteFooter } from "@/components/SiteFooter"

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description: profile.headline,
  metadataBase: new URL("https://dev.typenow.cn"),
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
