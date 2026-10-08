import { journey, journeyAxes } from "@/content/journey"
import { profile } from "@/content/profile"
import { Eyebrow, GlassCard, SectionTitle } from "./Glass"

export function Timeline() {
  const lastIndex = journey.length - 1

  return (
    <section id="journey" className="px-4 py-4 md:px-8 md:py-5">
      <GlassCard>
        <Eyebrow>Career Path · 2015 → 2026</Eyebrow>
        {/* 工龄取 profile.years，不按节点数推算：节点数与工龄是两回事，
            写 journey.length * 2 + 1 会在增删节点时静默算错年份 */}
        <SectionTitle accent="五级台阶">{`${profile.years} 年`}</SectionTitle>

        <div className="mt-4 text-[12px] font-medium text-ink-faint">
          {journeyAxes}
        </div>

        <ol className="mt-5 space-y-4">
          {journey.map((node, i) => {
            const isLast = i === lastIndex
            return (
              <li key={node.year} className="flex gap-3.5">
                {/* 渐变竖条：长度随卡片撑开，是「进度」的视觉暗示 */}
                <div
                  className={`w-1 shrink-0 rounded-full ${
                    isLast ? "grad-rule" : "bg-slate-200"
                  }`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="text-[13px] font-bold text-ink">{node.title}</span>
                    <span className="text-[11px] font-medium text-ink-faint">
                      {node.year} · {node.org}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                    {node.summary}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </GlassCard>
    </section>
  )
}
