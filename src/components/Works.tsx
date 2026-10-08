import Link from "next/link"
import { minorExperiences, projects } from "@/content/projects"
import { Eyebrow, SectionTitle } from "./Magazine"

export function Works() {
  return (
    <section id="works" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Eyebrow>Selected Works</Eyebrow>
        <SectionTitle>两个从零做起的系统</SectionTitle>

        <div className="mt-8 space-y-4">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="rounded-sm border border-rule bg-surface p-5 md:p-6"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-serif text-xl tracking-tight text-ink">
                      {p.name}
                    </h3>
                    <span className="font-mono text-[11px] italic text-ink-faint">
                      {p.codename}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.tagline}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-accent-wash px-3 py-1 text-[11px] text-ink-soft"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 md:w-32 md:text-right">
                  <div className="text-[11px] leading-relaxed text-ink-faint">
                    {p.metric.label}
                  </div>
                  <div className="font-serif text-2xl font-bold text-ink">
                    {p.metric.value}
                  </div>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="mt-3 inline-block text-xs font-medium text-accent hover:underline"
                  >
                    看详情 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 border-t border-rule pt-4">
          <Eyebrow>其他经历</Eyebrow>
          <dl className="mt-3 space-y-2">
            {minorExperiences.map((e) => (
              <div
                key={`${e.period}-${e.name}`}
                className="flex flex-wrap items-baseline gap-x-4 text-sm"
              >
                <dt className="w-24 shrink-0 font-mono text-[11px] text-accent">
                  {e.period}
                </dt>
                <dd className="flex-1 font-medium text-ink">{e.name}</dd>
                <dd className="text-[11px] text-ink-faint">{e.tech}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
