import { describe, expect, it } from "vitest"
import { journey, journeyAxes } from "./journey"
import { profile } from "./profile"
import { stack } from "./stack"

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

describe("技术栈内容", () => {
  it("恰好五组，key 不重复", () => {
    expect(stack).toHaveLength(5)
    const keys = stack.map((g) => g.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it("每组至少三项", () => {
    for (const g of stack) {
      expect(g.items.length, `${g.key} 项数太少`).toBeGreaterThanOrEqual(3)
    }
  })

  it("同一项不重复出现在不同组里", () => {
    const all = stack.flatMap((g) => g.items.map((i) => i.name))
    const dupes = all.filter((n, i) => all.indexOf(n) !== i)
    expect(dupes, `重复项：${dupes.join(", ")}`).toEqual([])
  })

  it("年限在合理区间（1–15 年）", () => {
    for (const g of stack) {
      for (const i of g.items) {
        expect(i.years, `${i.name} 年限越界`).toBeGreaterThanOrEqual(1)
        expect(i.years, `${i.name} 年限越界`).toBeLessThanOrEqual(15)
      }
    }
  })

  it("每项名称与年限都不为空", () => {
    for (const g of stack) {
      for (const i of g.items) {
        expect(i.name.trim(), `${g.key} 有空名称`).not.toBe("")
        expect(Number.isInteger(i.years), `${i.name} 年限须为整数`).toBe(true)
      }
    }
  })

  it("每组都有主力技术", () => {
    for (const g of stack) {
      expect(
        g.items.some((i) => i.primary),
        `${g.key} 没有标主力技术`,
      ).toBe(true)
    }
  })
})
