export type StackItem = {
  name: string
  years: number
  primary?: boolean
}

export type StackGroup = {
  key: "FRONTEND" | "BACKEND" | "DATA" | "AI" | "INFRA"
  label: string
  items: readonly StackItem[]
}

export const stack: readonly StackGroup[] = [
  {
    key: "FRONTEND",
    label: "前端",
    items: [
      { name: "Vue 3", years: 7, primary: true },
      { name: "React 19", years: 5, primary: true },
      { name: "TypeScript", years: 6, primary: true },
      { name: "React Native", years: 4 },
      { name: "Taro", years: 3 },
      { name: "Tailwind v4", years: 2 },
      { name: "Next.js 16", years: 1 },
    ],
  },
  {
    key: "BACKEND",
    label: "后端",
    items: [
      { name: "Node.js", years: 6, primary: true },
      { name: "Spring Boot", years: 3, primary: true },
      { name: "Express", years: 5 },
      { name: "MyBatis-Plus", years: 3 },
      { name: "gRPC", years: 2 },
      { name: "JWT / RBAC", years: 3 },
      { name: "Quartz", years: 2 },
    ],
  },
  {
    key: "DATA",
    label: "数据",
    items: [
      { name: "MySQL", years: 8, primary: true },
      { name: "Redis", years: 5, primary: true },
      { name: "ELK", years: 2 },
      { name: "Drizzle ORM", years: 1 },
    ],
  },
  {
    key: "AI",
    label: "AI",
    items: [
      { name: "LangChain4j", years: 1, primary: true },
      { name: "大模型工具调用", years: 1 },
      { name: "SSE 流式响应", years: 1 },
      { name: "Prompt 工程", years: 1 },
    ],
  },
  {
    key: "INFRA",
    label: "工程化",
    items: [
      { name: "WebSocket", years: 3 },
      { name: "Docker Compose", years: 3, primary: true },
      { name: "nginx", years: 5, primary: true },
      { name: "pm2", years: 3 },
      { name: "Jenkins", years: 4 },
      { name: "Sentry", years: 3 },
      { name: "Let's Encrypt", years: 2 },
    ],
  },
]
