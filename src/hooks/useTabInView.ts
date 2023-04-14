import React from "react"

type CategoryIdType = string | number

export interface TabsCategoryBase {
  id: CategoryIdType
}

export function useTabInView(tabs: TabsCategoryBase[], lockScrollTimeout = 1000) {
  const [state, setState] = React.useState<{ categoryIdInView: CategoryIdType | null; ratio: number }>({
    categoryIdInView: tabs[0]?.id,
    ratio: 1,
  })

  const [currentTabId, setCurrentTabId] = React.useState<CategoryIdType | null>(state.categoryIdInView)
  const ratioRef = React.useRef({ categoryId: state.categoryIdInView, ratio: state.ratio })
  const scrollRef = React.useRef<CategoryIdType | null>(null)

  const setCurrentTabIdForce = React.useCallback(
    (id: CategoryIdType) => {
      scrollRef.current = id
      setCurrentTabId(id)
      setTimeout(() => {
        if (scrollRef.current === id) {
          scrollRef.current = null
        }
      }, lockScrollTimeout)
    },
    [lockScrollTimeout]
  )

  const setInViewState = React.useCallback<typeof setState>((state) => {
    setState((prevState) => {
      const inViewItem = typeof state === "function" ? state(prevState) : state
      return inViewItem
    })
  }, [])

  const updateCurrentTab = React.useCallback((categoryId: CategoryIdType) => {
    setCurrentTabId((prevState) => {
      if (scrollRef.current && scrollRef.current === categoryId) {
        scrollRef.current = null
      }
      return scrollRef.current ? prevState : categoryId
    })
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
    ratioRef.current.categoryId && updateCurrentTab(ratioRef.current.categoryId)
  }, [state.categoryIdInView, state.ratio, updateCurrentTab])

  return { currentTabId, ratio: ratioRef.current.ratio, setInViewState, setCurrentTabIdForce } as const
}
