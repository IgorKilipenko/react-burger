import React from "react"
import { getTargetElement } from "./utils"

type TargetType = HTMLElement | Element

export function useHeight<T extends TargetType>(target: React.MutableRefObject<T>): number {
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
