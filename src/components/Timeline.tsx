import { journey, journeyAxes } from "@/content/journey"
import { profile } from "@/content/profile"
import { Eyebrow, SectionTitle } from "./Magazine"

export function Timeline() {
  const lastIndex = journey.length - 1

  return (
    <section id="journey" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Eyebrow>Career Path · 2015 → 2026</Eyebrow>
        {/* 工龄取 profile.years，不按节点数推算：节点数与工龄是两回事，
            写 journey.length * 2 + 1 会在增删节点时静默算错年份 */}
        <SectionTitle accent="五级台阶">{`${profile.years} 年`}</SectionTitle>

        <div className="mt-4 border-b border-rule pb-4 font-mono text-[10px] uppercase tracking-[0.13em] text-ink-faint">
          {journeyAxes}
        </div>

        <ol className="mt-2">
          {journey.map((node, i) => {
            const isLast = i === lastIndex
            return (
              <li
                key={node.year}
                className="flex gap-4 border-b border-rule-soft py-4 last:border-b-0 md:gap-6"
              >
                <div
                  className={`w-11 shrink-0 pt-1 font-mono text-[11px] ${
                    isLast ? "font-bold text-accent" : "text-accent"
                  }`}
                >
                  {node.year}
                </div>
                <div
                  className={`flex-1 border-l-2 pl-4 ${
                    isLast ? "border-accent" : "border-rule"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-base font-bold tracking-tight text-ink">
                      {node.title}
                    </h3>
                    <span className="font-serif text-[11px] italic text-ink-faint">
                      {node.org}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {node.summary}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
