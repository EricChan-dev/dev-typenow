export type ProjectDecision = {
  title: string
  body: string
}

export type Project = {
  slug: string
  name: string
  codename: string
  tagline: string
  tags: readonly string[]
  metric: { value: string; label: string }
  detail: {
    background: string
    role: string
    architecture: string
    decisions: readonly ProjectDecision[]
    outcome: string
  }
}

export const projects: readonly Project[] = [
  {
    slug: "otest",
    name: "移动端云真机测试平台",
    codename: "otest",
    tagline:
      "让测试同学在网页上直接操作真实手机。四端架构，WebSocket 打通 Server—Agent—Device 实时链路，接大模型自动生成与修复测试用例。",
    tags: [
      "Vue 3",
      "Spring Boot",
      "Electron",
      "WebSocket",
      "LangChain4j",
      "Docker Compose",
    ],
    metric: { value: "98%+", label: "设备连接成功率" },
    detail: {
      background:
        "测试团队要覆盖几十款真机，过去靠人工借机器、手工回归，设备利用率低且结果不可追溯。目标是让测试同学在浏览器里直接操作真机并自动生成用例。",
      role: "独立负责全栈：领域建模、四端架构设计、WebSocket 实时链路、AI 能力接入与部署编排。",
      architecture: [
        "Vue 3 管理端（云端）",
        "  │ HTTP / WebSocket",
        "Spring Boot 服务端   · JWT/RBAC · Quartz · MySQL · Redis",
        "  │ WebSocket（注册鉴权 / 设备发现 / 心跳保活 / 状态同步 / 异常重连）",
        "Java 设备 Agent      · ADB · scrcpy/minicap · WDA · MJPEG / H.264",
        "  │ 本地会话",
        "真机集群              另有 Electron 桌面端用于本地调试",
      ].join("\n"),
      decisions: [
        {
          title: "用 WebSocket 长连接而不是轮询",
          body: "设备状态变化频繁，轮询在几十台设备下会把服务端打满。代价是要自己实现心跳、重连与状态补偿。",
        },
        {
          title: "画面传输分离：MJPEG 与 H.264 双路径",
          body: "低端机用 MJPEG 保证兼容，主流机用 H.264 换流畅度。代价是 Agent 侧要维护两套编码。",
        },
        {
          title: "大模型只放在「生成/修复用例」，不进执行控制",
          body: "执行链路要确定性，不能有幻觉。AI 只进确定性要求低、价值高的环节。代价是每条生成结果仍要人工复核，模型响应也比规则引擎慢。",
        },
        {
          title: "服务端与设备 Agent 分离部署",
          body: "Agent 要贴近设备、直连 ADB，放同一进程会让扩容与故障隔离都变难。代价是多一跳网络与一套部署。",
        },
      ],
      outcome:
        "设备连接成功率 98%+；用例编写从手工逐条录入改为 AI 生成加人工确认；Docker Compose 一键起全栈，nginx 统一代理 HTTP 与 WebSocket。",
    },
  },
  {
    slug: "typenow",
    name: "TypeNow 码上英语",
    codename: "typenow.cn",
    tagline:
      "在线英语学习网站。从产品设计、数据建模到部署运维全部自己完成，含发音评分、练习计分与定时生命周期任务。",
    tags: [
      "Next.js 16",
      "React 19",
      "Tailwind v4",
      "MySQL",
      "Drizzle ORM",
      "pm2 + nginx",
    ],
    metric: { value: "一人", label: "从 0 到线上" },
    detail: {
      background:
        "想要一个能真正用起来的英语练习产品，而不是玩具项目。成功标准是自己每天愿意用它练，且能在低配服务器上稳定跑。",
      role: "独立完成全部工作：产品设计、数据建模、前后端实现、部署与运维。",
      architecture: [
        "浏览器",
        "  │ HTTP",
        "nginx（Let's Encrypt 终止 TLS，统一入口）",
        "  │ 反向代理",
        "Next.js 16 应用（pm2 常驻）",
        "  │ Drizzle ORM",
        "MySQL 8",
        "",
        "另有 webhook 服务监听 :9000，GitHub push 自动触发部署",
      ].join("\n"),
      decisions: [
        {
          title: "构建到暂存目录再原子切换，而不是就地覆写",
          body: "就地构建一旦中途失败会留下坏一半的产物，用户请求到未加载的 chunk 就 404，失败从「发布没生效」升级成「线上报错」。代价是磁盘多占一份构建产物。",
        },
        {
          title: "逐词评分用第三方返回的分词，不按自己的字段切词",
          body: "库里句子的标点是独立 token（如「Seven , eight」），自己切词会与评分服务的分词对不上。代价是逐词区只能显示对方给了分的词。",
        },
        {
          title: "生命周期任务寄生在应用内的 HTTP 端点，由 crontab 触发",
          body: "复用现有应用与鉴权，不必再维护一个独立定时服务。代价是任务可用性绑在应用上，应用重启期间到点的任务会被跳过，且密钥要交给 crontab。",
        },
        {
          title: "部署串行化并带拉取重试",
          body: "GitHub webhook 只触发一次、没有补偿机制，一次网络抖动就静默漏掉一次发布。代价是部署会排队等待。",
        },
      ],
      outcome:
        "稳定运行在 2 核 3.5G 的服务器上；每次 push 自动部署；发音评分落库后可在历史回看时查看。",
    },
  },
]

/** 次要经历：不做详情页，列表里一行带过。 */
export type MinorExperience = {
  period: string
  name: string
  tech: string
}

export const minorExperiences: readonly MinorExperience[] = [
  { period: "2023–2026", name: "易借钱贷款超市", tech: "Vue + Node.js + Redis" },
  { period: "2021–2022", name: "阳光互联网医院", tech: "小程序 / 医生端 / 管理端" },
  { period: "2021–2022", name: "惠金所 APP", tech: "React Native + Vue 2" },
]
