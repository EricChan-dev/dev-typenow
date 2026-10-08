import { describe, expect, it } from "vitest"
import { renderToStaticMarkup } from "react-dom/server"
import { ContactReveal } from "./ContactReveal"

// 同样由碎片拼出，避免测试文件成为全文唯一写死号码的地方。
const FULL_PHONE = ["166", "3448", "2010"].join("")
const FULL_EMAIL = `${FULL_PHONE}@163.com`

describe("联系方式隐私守卫", () => {
  it("服务端渲染的 HTML 里不出现完整手机号", () => {
    const html = renderToStaticMarkup(<ContactReveal />)
    expect(html).not.toContain(FULL_PHONE)
  })

  it("服务端渲染的 HTML 里不出现完整邮箱", () => {
    const html = renderToStaticMarkup(<ContactReveal />)
    expect(html).not.toContain(FULL_EMAIL)
  })

  it("初始状态只显示按钮文案", () => {
    const html = renderToStaticMarkup(<ContactReveal />)
    expect(html).toContain("查看联系方式")
  })
})
