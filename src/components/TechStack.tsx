import { stack } from "@/content/stack"
import { Eyebrow, SectionTitle } from "./Magazine"

export function TechStack() {
  return (
    <section id="stack" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Eyebrow>Technical Stack</Eyebrow>
        <SectionTitle>写过的每一样，都有项目背书</SectionTitle>

        <p className="mt-3 text-[11px] text-ink-faint">
          <span className="text-accent">⋆</span> = 主力技术 · 数字 = 实际使用年限
        </p>

        <dl className="mt-6">
          {stack.map((group, gi) => {
            const isLast = gi === stack.length - 1
            const border = isLast ? "border-y border-rule" : "border-t border-rule"
            return (
              <div
                key={group.key}
                className={`grid grid-cols-1 gap-x-6 gap-y-2 py-4 md:grid-cols-[6rem_1fr] ${border}`}
              >
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent md:pt-0.5">
                  {group.key}
                </dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className={
                        group.key === "AI"
                          ? "rounded-full bg-accent-wash px-2.5 py-0.5"
                          : undefined
                      }
                    >
                      <span className="font-medium text-ink">{item.name}</span>
                      <span className="ml-1.5 text-[11px] text-ink-faint">
                        {item.years}y
                        {item.primary ? <span className="ml-1 text-accent">⋆</span> : null}
                      </span>
                    </span>
                  ))}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
