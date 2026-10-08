/**
 * 把打散的联系方式碎片拼回完整字符串。
 *
 * 存在意义：完整号码一旦以连续文本出现在源码或 HTML 里，爬虫扫一遍就拿到了。
 * 碎片分开存放后，源码里搜完整号码搜不到，用户点击时才在浏览器内存中拼出来。
 *
 * 注意：这里刻意不做 trim / 过滤空串 —— 碎片是手写的常量，
 * 自动清洗会掩盖「碎片写错了」这个错误，让拼接结果静默出错。
 */
export function revealContact(fragments: readonly string[]): string {
  return fragments.join("")
}
