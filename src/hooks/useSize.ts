import React from "react"
import { getTargetElement } from "./utils"

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element

export type BasicTarget<T extends TargetType = Element> = React.MutableRefObject<TargetValue<T>>

export function useHeight<T extends BasicTarget>(target: T): number {
  const [height, setHeight] = React.useState(0)

  React.useLayoutEffect(() => {
    const element = getTargetElement(target)
    if (!element) return
    const resizeObserver = new ResizeObserver(() => {
      setHeight(element.clientHeight ?? 0)
    })
    resizeObserver.observe(element)
    return () => resizeObserver.disconnect()
  }, [target])

  return height
}
