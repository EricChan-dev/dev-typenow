import Link from "next/link"
import { Eyebrow, GlassCard } from "@/components/Glass"

export default function NotFound() {
  return (
    <main className="px-4 py-16 md:px-8 md:py-24">
      <GlassCard>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
          这一页不存在
        </h1>
        <p className="mt-4 max-w-[34em] text-sm leading-relaxed text-ink-soft">
          链接可能已经改了，或者本来就是错的。回到首页重新找吧。
        </p>
        <Link
          href="/"
          className="grad-btn mt-6 inline-block rounded-xl px-4 py-2 text-sm font-semibold"
        >
          回到首页
        </Link>
      </GlassCard>
    </main>
  )
}
