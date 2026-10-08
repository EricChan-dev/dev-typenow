import { profile } from "@/content/profile"
import { ContactReveal } from "./ContactReveal"
import { Eyebrow } from "./Magazine"

export function Hero() {
  return (
    <section className="px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <Eyebrow>
          {profile.name} · {profile.role} · {profile.years} 年
        </Eyebrow>

        <h1 className="mt-4 max-w-[16em] font-serif text-4xl leading-[1.14] tracking-tight text-ink md:text-5xl">
          {profile.headline}
          <em className="italic text-accent">{profile.headlineAccent}</em>。
        </h1>

        <p className="mt-5 max-w-[32em] text-[15px] leading-relaxed text-ink-soft">
          {profile.intro}
        </p>

        {/* 数字栏：靠 1px 间隙露出底色形成表格线，是杂志数据栏的做法。
            不用 per-cell 边框：那样在 2 列 / 4 列两个断点下要分别为第 2、4 项
            去掉右边框、为最后一行去掉下边框，极易漏掉一条而出现双线。 */}
        <dl className="mt-9 grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
          {profile.metrics.map((m) => (
            <div key={m.label} className="bg-canvas px-4 py-4">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="font-serif text-3xl leading-none tracking-tight text-ink">
                  {m.value}
                  <em className="ml-1 font-serif text-xs not-italic text-ink-faint">
                    <span className="italic">{m.unit}</span>
                  </em>
                </span>
                <span className="mt-2 block text-[11px] text-ink-faint">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ContactReveal />
          <a
            href="/resume.pdf"
            className="rounded-sm border border-rule bg-surface px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            下载 PDF 简历
          </a>
        </div>
      </div>
    </section>
  )
}
