import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // PDF 简历暂未发布；将来放上去也不希望被搜索引擎收录
      // （注意：Disallow 只挡合规爬虫，详情仍可能被爬走，见设计文档 §7）
      disallow: ["/resume.pdf"],
    },
    sitemap: "https://dev.typenow.cn/sitemap.xml",
  }
}
