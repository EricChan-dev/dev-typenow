import type { ReactNode } from "react"

/** 小号等宽全大写标签，杂志里对应「栏目名/眉标」。 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
      {children}
    </div>
  )
}

/** 节标题：衬线大字，可带斜体强调尾。 */
export function SectionTitle({
  children,
  accent,
}: {
  children: ReactNode
  accent?: ReactNode
}) {
  return (
    <h2 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-ink md:text-4xl">
      {children}
      {accent ? (
        <>
          ，<em className="italic text-accent">{accent}</em>
        </>
      ) : null}
    </h2>
  )
}
