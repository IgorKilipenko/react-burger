import React from "react"

type CategoryIdType = string | number

export interface TabsCategoryBase {
  id: CategoryIdType
}

export function useTabInView(tabs: TabsCategoryBase[]) {
  const [state, setState] = React.useState<{ categoryIdInView: CategoryIdType | null; ratio: number }>({
    categoryIdInView: tabs[0]?.id,
    ratio: 1,
  })

  const [currentTabId, setCurrentTabId] = React.useState<CategoryIdType | null>(state.categoryIdInView)
  const ratioRef = React.useRef({ categoryId: state.categoryIdInView, ratio: state.ratio })
  const scrollRef = React.useRef<CategoryIdType | null>(null)

  const setCurrentTabIdForce = React.useCallback((id: CategoryIdType) => {
    scrollRef.current = id
    setCurrentTabId(id)
  }, [])

  const setInViewState = React.useCallback<typeof setState>((state) => {
    setState(state)
  }, [])

  React.useEffect(() => {
    if (scrollRef && scrollRef.current != null) {
      if (scrollRef.current === state?.categoryIdInView) {
        scrollRef.current = null
      } else {
        return
      }
    }

    const activeRatio = ratioRef.current

    if (activeRatio.categoryId !== state.categoryIdInView && state.ratio > activeRatio.ratio) {
      ratioRef.current = { ...ratioRef.current, categoryId: state.categoryIdInView, ratio: state.ratio }
      setCurrentTabId(state.categoryIdInView)
      return
    }

    ratioRef.current = { ...ratioRef.current, ratio: state.ratio ?? 0 }
  }, [scrollRef, state])

  return { currentTabId, ratio: ratioRef.current.ratio, setInViewState, setCurrentTabIdForce } as const
}
