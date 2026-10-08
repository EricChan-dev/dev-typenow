export type Profile = {
  name: string
  role: string
  years: number
  city: string
  headline: string
  headlineAccent: string
  intro: string
  metrics: readonly { value: string; unit: string; label: string }[]
}

export const profile: Profile = {
  name: "陈应帅",
  role: "全栈工程师",
  years: 11,
  city: "北京",
  headline: "从写页面，到",
  headlineAccent: "一个人交付整个平台",
  intro:
    "iOS 出身，做过千亿级金融核心业务的前端与全栈，现在独立交付一套四端云真机测试平台。既能在日活千万的系统里兜住稳定性，也能从零把产品做出来。",
  metrics: [
    { value: "11", unit: "年", label: "全栈开发经验" },
    { value: "1200", unit: "万/日", label: "峰值业务 PV" },
    { value: "1000", unit: "亿+", label: "累计放款规模" },
    { value: "11", unit: "项", label: "金融技术专利（已受理）" },
  ],
}
