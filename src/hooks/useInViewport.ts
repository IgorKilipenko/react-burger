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

export function useInViewport(target: BasicTarget, options?: Options) {
  const [state, setState] = useState<boolean>()
  const [ratio, setRatio] = useState<number>()

  useEffect(
    () => {
      const element = getTargetElement(target)
      if (!element) {
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setRatio(entry.intersectionRatio)
            setState(entry.isIntersecting)
          }
        },
        {
          ...options,
          root: getTargetElement(options?.root),
        }
      )

      observer.observe(element)

      return () => {
        observer.disconnect()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [target, options?.rootMargin, options?.threshold]
  )

  return [state, ratio] as const
}