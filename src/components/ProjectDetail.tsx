import Link from "next/link"
import type { ReactNode } from "react"
import type { Project } from "@/content/projects"

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
    <article className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#works"
          className="font-mono text-[11px] text-ink-faint hover:text-accent"
        >
          ← 返回作品
        </Link>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 border-b border-rule pb-3">
          <span className="font-mono text-[11px] text-accent">
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <h1 className="font-serif text-2xl tracking-tight text-ink">{project.name}</h1>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink-soft">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-accent-wash px-3 py-1 text-[11px] text-ink-soft"
            >
              {t}
            </li>
          ))}
        </ul>

        <dl className="mt-8">
          <Row label={SECTIONS[0]}>{d.background}</Row>
          <Row label={SECTIONS[1]}>{d.role}</Row>
          <Row label={SECTIONS[2]}>
            <pre className="overflow-x-auto rounded-sm border border-rule bg-surface p-4 font-mono text-[11px] leading-loose text-ink-soft">
              {d.architecture}
            </pre>
          </Row>
          <Row label={SECTIONS[3]}>
            <div className="space-y-4">
              {d.decisions.map((dec) => (
                <div key={dec.title}>
                  <h3 className="font-serif text-sm font-bold text-ink">{dec.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{dec.body}</p>
                </div>
              ))}
            </div>
          </Row>
          <Row label={SECTIONS[4]} last>
            {d.outcome}
          </Row>
        </dl>
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
      className={`grid grid-cols-1 gap-x-6 gap-y-2 py-5 md:grid-cols-[6rem_1fr] ${
        last ? "" : "border-b border-rule-soft"
      }`}
    >
      <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-accent md:pt-0.5">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink-soft">{children}</dd>
    </div>
  )
}
