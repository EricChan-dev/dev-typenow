import { describe, expect, it } from "vitest"
import { revealContact } from "./contact"

// 期望值由碎片拼出，而不是写成字面量：这样完整号码在仓库任何角落都不存在，
// `grep -rn "<完整号码>" src/` 能保持「结果为空」这条硬性不变量。
const FULL_PHONE = ["166", "3448", "2010"].join("")

describe("revealContact", () => {
  it("把碎片按顺序拼成完整号码", () => {
    expect(revealContact(["166", "3448", "2010"])).toBe(FULL_PHONE)
  })

  it("允许片段是单字符（碎片可以切得很碎）", () => {
    expect(revealContact(["1", "6", "6"])).toBe("166")
  })

  it("空数组返回空串而不是抛错", () => {
    expect(revealContact([])).toBe("")
  })
})
