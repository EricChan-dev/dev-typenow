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
  intro: "iOS 出身。",
  metrics: [],
}
