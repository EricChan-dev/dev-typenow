import Link from "next/link"
import type { ReactNode } from "react"
import type { Project } from "@/content/projects"
import { GlassCard } from "./Glass"

const SECTIONS = ["背景与目标", "我的角色", "架构", "关键取舍", "结果"] as const

export function ProjectDetail({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const d = project.detail

  return (
    <article className="px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl space-y-4">
        <Link
          href="/#works"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-faint transition-colors hover:text-accent"
        >
          返回作品
        </Link>

        <GlassCard className="overflow-hidden">
          <div className="grad-rule -mx-5 -mt-5 mb-6 h-1 md:-mx-7 md:-mt-7" aria-hidden />

          {/* 序号用渐变文字，和首页数字栏是同一套语言 */}
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="grad-text font-mono text-[12px] font-bold">
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
              {project.name}
            </h1>
            <span className="font-mono text-[11px] font-medium text-ink-faint">
              {project.codename}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{project.tagline}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
              >
                {t}
              </li>
            ))}
          </ul>

          {/* 关键数字：首页卡片上写着「看详情」，这里是兑现的地方 */}
          <div className="mt-5 inline-flex items-baseline gap-2.5 rounded-xl bg-accent-wash px-4 py-2.5">
            <span className="grad-text text-xl font-extrabold tracking-tight">
              {project.metric.value}
            </span>
            <span className="text-[11px] text-ink-faint">{project.metric.label}</span>
          </div>
        </GlassCard>

        <GlassCard>
          <Row label={SECTIONS[0]}>{d.background}</Row>
          <Row label={SECTIONS[1]}>{d.role}</Row>
          <Row label={SECTIONS[2]}>
            {/* 架构图是纯文本对齐的，窄屏必然超宽；overflow-x-auto 让它自己滚，
                而不是把整页撑出横向滚动条 */}
            <pre className="overflow-x-auto rounded-xl border border-white/70 bg-slate-900/90 p-4 font-mono text-[11px] leading-loose text-slate-200">
              {d.architecture}
            </pre>
          </Row>
          <Row label={SECTIONS[3]}>
            <div className="space-y-4">
              {d.decisions.map((dec) => (
                <div
                  key={dec.title}
                  className="rounded-xl border border-white/70 bg-white/60 p-3.5 backdrop-blur-md"
                >
                  <h3 className="text-[13px] font-bold text-ink">{dec.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{dec.body}</p>
                </div>
              ))}
            </div>
          </Row>
          <Row label={SECTIONS[4]} last>
            {d.outcome}
          </Row>
        </GlassCard>
      </div>
    </article>
  )
}

function Row({
  label,
  children,
  last,
}: {
  label: string
  children: ReactNode
  last?: boolean
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-x-6 gap-y-2 py-5 first:pt-0 md:grid-cols-[7rem_1fr] ${
        last ? "" : "border-b border-rule-soft"
      }`}
    >
      <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-accent md:items-start md:pt-0.5">
        <span className="grad-rule h-3 w-0.5 shrink-0 rounded-full" aria-hidden />
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink-soft">{children}</dd>
    </div>
  )
}
