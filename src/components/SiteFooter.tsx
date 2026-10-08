import { profile } from "@/content/profile"
import { ContactReveal } from "./ContactReveal"

export function SiteFooter() {
  return (
    <footer className="border-t border-rule px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 text-sm text-ink-faint md:flex-row md:items-center md:justify-between">
        <span>
          {profile.name} · {profile.role} · {profile.years} 年
        </span>
        <ContactReveal />
      </div>
    </footer>
  )
}
