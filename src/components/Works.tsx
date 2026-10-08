import Link from "next/link"
import { minorExperiences, projects } from "@/content/projects"
import { Eyebrow, GlassCard, SectionTitle } from "./Glass"

export function Works() {
  return (
    <section id="works" className="px-4 py-4 md:px-8 md:py-5">
      <GlassCard>
        <Eyebrow>Selected Works</Eyebrow>
        <SectionTitle>两个从零做起的系统</SectionTitle>

        <div className="mt-6 space-y-4">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="rounded-xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-md"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-lg font-extrabold tracking-tight text-ink">
                      {p.name}
                    </h3>
                    <span className="font-mono text-[11px] font-medium text-ink-faint">
                      {p.codename}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.tagline}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 关键数字单独成块：它是「点进详情」的主要诱惑 */}
                <div className="shrink-0 rounded-xl bg-accent-wash px-4 py-3 md:w-36 md:text-right">
                  <div className="text-[10px] leading-snug text-ink-faint">
                    {p.metric.label}
                  </div>
                  <div className="grad-text mt-0.5 text-xl font-extrabold tracking-tight">
                    {p.metric.value}
                  </div>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="mt-2 inline-block text-xs font-semibold text-accent hover:underline"
                  >
                    看详情 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 border-t border-rule pt-5">
          <Eyebrow>其他经历</Eyebrow>
          <dl className="mt-3 space-y-2.5">
            {minorExperiences.map((e) => (
              <div
                key={`${e.period}-${e.name}`}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 text-sm"
              >
                <dt className="font-mono text-[11px] font-semibold text-accent md:w-28 md:shrink-0">
                  {e.period}
                </dt>
                <dd className="flex-1 font-medium text-ink">{e.name}</dd>
                <dd className="text-[11px] text-ink-faint">{e.tech}</dd>
              </div>
            ))}
          </dl>
        </div>
      </GlassCard>
    </section>
  )
}
