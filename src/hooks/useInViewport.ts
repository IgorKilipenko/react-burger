import { useState, useEffect } from "react"
import { getTargetElement } from "./utils"

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element

export type BasicTarget<T extends TargetType = Element> = React.MutableRefObject<TargetValue<T>>

export interface Options {
  rootMargin?: string
  threshold?: number | number[]
  root?: BasicTarget<Element>
}

export function useInViewport(target: BasicTarget, options?: Options, withPresentHeight: boolean = true) {
  const [state, setState] = useState<boolean>()
  const [ratio, setRatio] = useState<number>()

  useEffect(
    () => {
      const element = getTargetElement(target)
      if (!element) {
        return
      }

      const parentElement = options?.root ? getTargetElement(options.root) : element.parentElement

      const heightRatio =
        !withPresentHeight || !parentElement || element.clientHeight === 0 || parentElement.clientHeight === 0
          ? 1
          : Math.max(element.clientHeight / parentElement.clientHeight, 1)

      if (withPresentHeight && options?.threshold) {
        options.threshold = !Array.isArray(options.threshold)
          ? options.threshold / heightRatio
          : options.threshold.map((v) => v / heightRatio)
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio * heightRatio)
            setState(entry.isIntersecting)
          }
        },
        {
          ...options,
          root: parentElement,
        }
      )

      observer.observe(element)

      return () => {
        observer.disconnect()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [target, options?.rootMargin, options?.threshold, withPresentHeight]
  )

  return [state, ratio] as const
}
