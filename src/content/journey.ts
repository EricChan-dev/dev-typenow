export type JourneyNode = {
  year: string
  org: string
  title: string
  summary: string
}

export const journeyAxes = "写页面 → 建体系 → 跨端 → 架构 → 平台 + AI"

export const journey: readonly JourneyNode[] = [
  {
    year: "2015",
    org: "iOS 开发",
    title: "原生移动端起步",
    summary:
      "刚毕业做 iOS，处理多机型适配与性能问题。这段原生底子后来直接复用在 RN 容器与真机接入上。",
  },
  {
    year: "2018",
    org: "展恒基金",
    title: "从写页面到建体系",
    summary:
      "搭前端工程化与自动化部署，线上 bug 率降 40%+，方案沉淀为公司前端通用标准。",
  },
  {
    year: "2021",
    org: "阳光保险",
    title: "跨端与原生底座",
    summary:
      "自研 JSBridge + RN 容器，抹平 iOS/Android WebView 差异，跨端可维护性提升 50%。",
  },
  {
    year: "2023",
    org: "马上消费金融",
    title: "架构与稳定性",
    summary:
      "日均 1200 万 PV、累计放款超千亿，可用性 99.99%，11 项金融技术专利获受理。",
  },
  {
    year: "2026",
    org: "OPay",
    title: "平台 + AI",
    summary:
      "独立交付四端云真机测试平台，LangChain4j 接入大模型做用例生成、补全与修复，SSE 流式响应。",
  },
]
