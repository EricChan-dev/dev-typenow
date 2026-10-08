import { profile } from "@/content/profile"
import { ContactReveal } from "./ContactReveal"
import { GlassCard } from "./Glass"

/** 数字卡的单项。抽出来是因为首屏数字栏和项目详情页的结果区都用同一套视觉。 */
export function Metric({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/70 px-3.5 py-3.5 shadow-sm backdrop-blur-md">
      <div className="text-2xl font-extrabold leading-none tracking-tight text-ink md:text-[1.75rem]">
        {value}
        <span className="ml-0.5 text-xs font-semibold text-ink-faint">{unit}</span>
      </div>
      <div className="mt-1.5 text-[11px] leading-snug text-ink-faint">{label}</div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="px-4 pt-6 md:px-8 md:pt-10">
      <GlassCard className="overflow-hidden">
        {/* 顶部的渐变装饰条，替代上一版的细分割线 */}
        <div className="grad-rule -mx-5 -mt-5 mb-6 h-1 md:-mx-7 md:-mt-7" aria-hidden />

        <div className="grad-btn inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden />
          {profile.years} 年全栈经验
        </div>

        <h1 className="mt-5 max-w-[18em] text-3xl font-extrabold leading-[1.15] tracking-tight text-ink md:text-5xl">
          {profile.headline}
          <span className="grad-text">{profile.headlineAccent}</span>。
        </h1>

        <p className="mt-5 max-w-[34em] text-[15px] leading-relaxed text-ink-soft">
          {profile.intro}
        </p>

        {/* 数字栏：每个数字一张独立玻璃小卡，靠间隙而非表格线分隔 */}
        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {profile.metrics.map((m) => (
            <Metric key={m.label} value={m.value} unit={m.unit} label={m.label} />
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ContactReveal />
          {/* PDF 简历暂不发布：文件里含明文手机号，会绕过「点击才显示」的隐私保护，
              而本仓库是公开的。这里保留按钮位（用户 2026-10-08 选择「保留按钮占位」），
              但不指向不存在的文件——求职站上最不该有的就是一个点了 404 的按钮。
              确认要发布时，把 public/resume.pdf 放进去并改回 <a href="/resume.pdf">。 */}
          <button
            type="button"
            disabled
            title="PDF 简历整理中，可先通过「查看联系方式」联系我"
            className="cursor-not-allowed rounded-xl border border-white/70 bg-white/50 px-4 py-2 text-sm text-ink-faint backdrop-blur-md"
          >
            简历 PDF（整理中）
          </button>
        </div>
      </GlassCard>
    </section>
  )
}
