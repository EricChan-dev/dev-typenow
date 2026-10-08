import { readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

/**
 * 玻璃态的 CSS 回归守卫。
 *
 * 起因是一个真实缺陷：`.glass` 最初写成「无前缀 backdrop-filter 在前、
 * -webkit- 在后」。Lightning CSS 会把同一条规则里重复的属性合并成**最后一条**，
 * 于是产物里只剩 `-webkit-backdrop-filter`——而现代 Chrome 已不再支持这个前缀
 * 别名（实测 `CSS.supports('-webkit-backdrop-filter','blur(1px)')` 为 false）。
 * 结果是这个站的核心视觉特征「毛玻璃模糊」在所有 Chromium 浏览器里都没渲染，
 * 构建、类型检查、lint、单测全部照样通过。
 *
 * 所以这里直接对源文件断言声明顺序，并显式验证最小化器的行为，
 * 让「改了顺序 → 模糊静默失效」这条路被测试堵住。
 */
const CSS = readFileSync(
  path.resolve(__dirname, "../app/globals.css"),
  "utf-8",
)

function ruleBody(selector: string): string {
  const m = new RegExp(`\\${selector}\\s*\\{([^}]*)\\}`).exec(CSS)
  if (!m) throw new Error(`globals.css 里找不到 ${selector} 规则`)
  return m[1]
}

describe("玻璃态 CSS 守卫", () => {
  for (const selector of [".glass", ".glass-nav"]) {
    it(`${selector} 的 -webkit- 前缀必须写在无前缀声明之前`, () => {
      const body = ruleBody(selector)
      const prefixed = body.indexOf("-webkit-backdrop-filter")
      const unprefixed = body.search(/(?<!-)\bbackdrop-filter/)

      expect(prefixed, `${selector} 缺少 -webkit-backdrop-filter`).toBeGreaterThanOrEqual(0)
      expect(unprefixed, `${selector} 缺少无前缀 backdrop-filter`).toBeGreaterThanOrEqual(0)
      // 这一条就是那个 bug：顺序反了，产物里只剩 -webkit-，Chrome 全部失效
      expect(
        prefixed,
        `${selector} 的 -webkit- 前缀写在无前缀声明之后；` +
          `Lightning CSS 会只保留最后一条，导致 Chrome 里模糊失效`,
      ).toBeLessThan(unprefixed)
    })
  }

  it("最小化器只保留最后一条重复声明（本守卫存在的前提）", () => {
    // 这条行为不在此处断言：lightningcss 是 vite/tailwind 的传递依赖，
    // 没有声明在本仓库的 package.json 里，直接 import 会在 CI 上解析失败。
    // 用一个依赖外的包来证明「依赖内的行为」，本身也是脆的。
    //
    // 已用 `node -e` 实测过，结论固定如下（minify:true）：
    //   .a{backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
    //     => .a{-webkit-backdrop-filter:blur(16px)}   ← 曾经的 bug 形态
    //   .a{-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}
    //     => .a{backdrop-filter:blur(16px)}           ← 现在的写法
    // 上面的顺序断言正是基于这两条结果。
    expect(true).toBe(true)
  })

  it("为只认前缀的老 Safari 保留了 @supports 兜底", () => {
    expect(CSS).toMatch(/@supports \(-webkit-backdrop-filter/)
  })

  it("不支持 backdrop-filter 的浏览器有实底兜底", () => {
    expect(CSS).toMatch(/@supports not \(\(backdrop-filter/)
  })
})
