"use client"

import { useState } from "react"
import { EMAIL_DOMAIN, PHONE_FRAGMENTS } from "@/content/contact"
import { revealContact } from "@/lib/contact"

/**
 * 点击才显示联系方式。
 *
 * 为什么不用「反转字符串再还原」这类小把戏：爬虫早就会跑 JS 了，
 * 混淆只挡得住最笨的爬虫。真正的防护是**服务端渲染时不含号码**——
 * 碎片只在点击后由客户端拼接，静态 HTML 里搜不到。
 * 代价是禁用 JS 的访客看不到联系方式，对方是可接受的小比例。
 */
export function ContactReveal() {
  const [shown, setShown] = useState(false)

  if (!shown) {
    return (
      <button
        type="button"
        onClick={() => setShown(true)}
        className="grad-btn rounded-xl px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
      >
        查看联系方式
      </button>
    )
  }

  const phone = revealContact(PHONE_FRAGMENTS)
  const email = `${phone}${EMAIL_DOMAIN}`

  return (
    <span className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <a href={`tel:${phone}`} className="font-semibold text-accent hover:underline">
        {phone}
      </a>
      <a href={`mailto:${email}`} className="font-semibold text-accent hover:underline">
        {email}
      </a>
    </span>
  )
}
