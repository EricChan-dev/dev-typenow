import { describe, expect, it } from "vitest"
import { journey, journeyAxes } from "./journey"
import { profile } from "./profile"

describe("心路历程内容", () => {
  it("恰好五个节点", () => {
    expect(journey).toHaveLength(5)
  })

  it("年份严格递增", () => {
    const years = journey.map((n) => Number(n.year))
    for (let i = 1; i < years.length; i++) {
      expect(years[i]).toBeGreaterThan(years[i - 1])
    }
  })

  it("每个节点四个字段都不为空", () => {
    for (const node of journey) {
      expect(node.year.trim(), `节点 ${node.title} 缺 year`).not.toBe("")
      expect(node.org.trim(), `节点 ${node.title} 缺 org`).not.toBe("")
      expect(node.title.trim(), `节点 ${node.year} 缺 title`).not.toBe("")
      expect(node.summary.trim(), `节点 ${node.title} 缺 summary`).not.toBe("")
    }
  })

  it("描述长度在 30–80 字之间", () => {
    for (const node of journey) {
      expect(node.summary.length, `${node.title} 描述过短`).toBeGreaterThanOrEqual(30)
      expect(node.summary.length, `${node.title} 描述过长`).toBeLessThanOrEqual(80)
    }
  })

  it("主轴是五级", () => {
    expect(journeyAxes.split("→")).toHaveLength(5)
  })

  it("首个节点是 2015，用来交代简历上的三年空档", () => {
    expect(journey[0].year).toBe("2015")
  })
})

describe("profile 内容", () => {
  it("四个数字都有单位与说明", () => {
    expect(profile.metrics).toHaveLength(4)
    for (const m of profile.metrics) {
      expect(m.value.trim()).not.toBe("")
      expect(m.unit.trim()).not.toBe("")
      expect(m.label.trim()).not.toBe("")
    }
  })

  it("工龄与简历一致", () => {
    expect(profile.years).toBe(11)
  })
})
