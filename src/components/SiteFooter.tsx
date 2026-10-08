import { profile } from "@/content/profile"
import { ContactReveal } from "./ContactReveal"

export function SiteFooter() {
  return (
    <footer className="px-4 py-6 md:px-8 md:py-8">
      <div className="glass flex flex-col gap-3 rounded-2xl px-5 py-5 text-sm text-ink-faint md:flex-row md:items-center md:justify-between">
        <span className="text-[12px]">
          {profile.name} · {profile.role} · {profile.years} 年 · 2015 → 2026
        </span>
        <ContactReveal />
      </div>
    </footer>
  )
}
