import { describe, expect, it } from "vitest"
import { minorExperiences, projects } from "./projects"

describe("项目内容", () => {
  it("两个重点项目，slug 唯一且可用作路由", () => {
    expect(projects).toHaveLength(2)
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) {
      expect(slug, `slug ${slug} 只能含小写字母与连字符`).toMatch(/^[a-z][a-z0-9-]*$/)
    }
  })

  it("每个项目详情五段齐全", () => {
    for (const p of projects) {
      expect(p.detail.background.trim(), `${p.slug} 缺 background`).not.toBe("")
      expect(p.detail.role.trim(), `${p.slug} 缺 role`).not.toBe("")
      expect(p.detail.architecture.trim(), `${p.slug} 缺 architecture`).not.toBe("")
      expect(p.detail.outcome.trim(), `${p.slug} 缺 outcome`).not.toBe("")
      // 设计文档 §5.1 要求「关键取舍各四条以上」。
      // 这里断言 4 而不是 3：取舍是详情页唯一无法靠模板补齐的内容，
      // 低于 4 条会让人觉得「这项目没什么可讲的」。
      expect(p.detail.decisions.length, `${p.slug} 取舍少于 4 条`).toBeGreaterThanOrEqual(4)
    }
  })

  it("每条取舍都写了「代价」，而不只是好处", () => {
    for (const p of projects) {
      for (const d of p.detail.decisions) {
        expect(d.title.trim(), `${p.slug} 有取舍缺标题`).not.toBe("")
        expect(d.body.length, `${p.slug} 的「${d.title}」没写代价`).toBeGreaterThan(25)
        expect(
          /代价|成本|多|慢|受限/.test(d.body),
          `${p.slug} 的「${d.title}」没写明放弃了什么`,
        ).toBe(true)
      }
    }
  })

  it("每个项目都有标签与一个关键数字", () => {
    for (const p of projects) {
      expect(p.tags.length, `${p.slug} 标签太少`).toBeGreaterThanOrEqual(4)
      expect(p.metric.value.trim(), `${p.slug} 缺 metric.value`).not.toBe("")
      expect(p.metric.label.trim(), `${p.slug} 缺 metric.label`).not.toBe("")
    }
  })

  it("次要经历三条，都有周期与名称", () => {
    expect(minorExperiences).toHaveLength(3)
    for (const e of minorExperiences) {
      expect(e.period.trim()).not.toBe("")
      expect(e.name.trim()).not.toBe("")
      expect(e.tech.trim()).not.toBe("")
    }
  })
})
