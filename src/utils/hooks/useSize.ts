import React from "react"

type TargetType = HTMLElement | Element;

export function useHeight<T extends TargetType>( target : React.MutableRefObject<T> ) : number  {
  const [height, setHeight] = React.useState(0)

  React.useLayoutEffect(() => {
    if (!target.current) return
    const resizeObserver = new ResizeObserver(() => {
      setHeight(target.current.clientHeight ?? 0)
    })
    resizeObserver.observe(target.current)
    return () => resizeObserver.disconnect()
  }, [target])

  return height
}
