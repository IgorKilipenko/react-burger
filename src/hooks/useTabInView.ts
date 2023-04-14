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
    if (ratioRef.current.categoryId !== state.categoryIdInView && state.ratio > ratioRef.current.ratio) {
      ratioRef.current = {
        ...ratioRef.current,
        categoryId: state.categoryIdInView,
        ratio: state.ratio,
      }
    } else {
      ratioRef.current = { ...ratioRef.current, ratio: state.ratio ?? 0 }
    }
    setCurrentTabId((prevState) => {
      if (scrollRef.current && scrollRef.current === ratioRef.current.categoryId) {
        scrollRef.current = null
      }

      return scrollRef.current ? prevState : ratioRef.current.categoryId
    })
  }, [scrollRef, state])

  return { currentTabId, ratio: ratioRef.current.ratio, setInViewState, setCurrentTabIdForce } as const
}
