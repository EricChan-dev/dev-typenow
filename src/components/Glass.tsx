import Link from "next/link"
import type { ReactNode } from "react"

/**
 * 玻璃态的共享基元。
 *
 * 视觉语言来自 lks0426.com 的编译产物：无衬线字重分层 + 毛玻璃卡片 +
 * 蓝紫青渐变强调色。刻意不用衬线——衬线是上一版「杂志编辑感」的标志，
 * 两套语言混用会让层级失焦。
 */

/** 小号全大写标签，behind it 是渐变短线。 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">
      <span className="grad-rule h-3 w-0.5 rounded-full" aria-hidden />
      {children}
    </div>
  )
}

/** 节标题：粗无衬线大字，强调尾用渐变文字。 */
export function SectionTitle({
  children,
  accent,
}: {
  children: ReactNode
  accent?: ReactNode
}) {
  return (
    <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-ink md:text-3xl">
      {children}
      {accent ? <span className="grad-text">{accent}</span> : null}
    </h2>
  )
}

/** 玻璃卡片。padding 与圆角在所有区块保持一致，避免同页出现两种「玻璃厚度」。 */
export function GlassCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  as?: "div" | "article" | "section"
}) {
  return (
    <Tag className={`glass rounded-2xl p-5 md:p-7 ${className}`}>{children}</Tag>
  )
}

const NAV = [
  { href: "/#top", label: "首页" },
  { href: "/#works", label: "项目作品" },
  { href: "/#stack", label: "技术栈" },
  { href: "/#journey", label: "学习历程" },
]

/**
 * 左侧固定导航——这个风格最标志性的结构。
 *
 * 纯服务端组件：不做「当前段落高亮」，那需要 IntersectionObserver + 客户端状态；
 * 导航本来就是四个跳转锚点，高亮带来的收益抵不上多一个 client bundle。
 */
export function SideNav({ name, role }: { name: string; role: string }) {
  return (
    <>
      {/* 桌面端：左侧固定玻璃导航 */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-56 flex-col p-4 lg:flex">
        <div className="glass-nav flex h-full flex-col rounded-2xl p-5">
          <Link href="/#top" className="block">
            <div className="grad-text text-xl font-extrabold tracking-tight">{name}</div>
            <div className="mt-0.5 text-[11px] text-ink-faint">{role}</div>
          </Link>

          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-[13px] transition-colors ${
                  i === 0
                    ? "grad-btn font-semibold"
                    : "font-medium text-ink-soft hover:bg-white/70 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-rule pt-4 text-[11px] leading-relaxed text-ink-faint">
            2015 → 2026
            <br />
            五级台阶
          </div>
        </div>
      </aside>

      {/* 移动端：顶部玻璃条，否则小屏没有入口 */}
      <header className="glass-nav sticky top-0 z-30 flex items-center justify-between px-4 py-3 lg:hidden">
        <Link href="/#top" className="grad-text text-base font-extrabold tracking-tight">
          {name}
        </Link>
        <nav className="flex gap-1">
          {NAV.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-ink-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  )
}
