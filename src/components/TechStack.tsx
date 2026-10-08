import { stack } from "@/content/stack"
import { Eyebrow, GlassCard, SectionTitle } from "./Glass"

export function TechStack() {
  return (
    <section id="stack" className="px-4 py-4 md:px-8 md:py-5">
      <GlassCard>
        <Eyebrow>Technical Stack</Eyebrow>
        <SectionTitle>写过的每一样，都有项目背书</SectionTitle>

        <p className="mt-3 text-[11px] text-ink-faint">
          <span className="font-semibold text-accent">★</span> = 主力技术 · 数字 = 实际使用年限
        </p>

        <div className="mt-6 space-y-5">
          {stack.map((group) => (
            <div key={group.key}>
              <div className="flex items-center gap-2">
                <div className="grad-rule h-3 w-0.5 rounded-full" aria-hidden />
                <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                  {group.key}
                  <span className="ml-2 font-normal normal-case tracking-normal text-ink-faint">
                    {group.label}
                  </span>
                </div>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                      item.primary
                        ? "grad-btn font-semibold"
                        : "border border-white/80 bg-white/80 text-ink-soft"
                    }`}
                  >
                    {item.name}
                    <span className={item.primary ? "ml-1 text-white/75" : "ml-1 text-ink-faint"}>
                      {item.years}y
                    </span>
                    {item.primary ? <span className="ml-1 text-white/90">★</span> : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  )
}
