import React from "react"

type ItemIdType = string | number

export interface TabItemBase {
  id: ItemIdType
}

export function useTabInView(tabs: TabItemBase[], lockScrollTimeout = 1000) {
  const [state, setState] = React.useState<{ itemIdInView: ItemIdType | null; ratio: number }>({
    itemIdInView: tabs[0]?.id,
    ratio: 1,
  })

  const [currentTabId, setCurrentTabId] = React.useState<ItemIdType | null>(state.itemIdInView)
  const ratioRef = React.useRef({ categoryId: state.itemIdInView, ratio: state.ratio })
  const scrollRef = React.useRef<ItemIdType | null>(null)

  const setCurrentTabIdForce = React.useCallback(
    (id: ItemIdType) => {
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

  const updateCurrentTab = React.useCallback((categoryId: ItemIdType) => {
    setCurrentTabId((prevState) => {
      if (scrollRef.current && scrollRef.current === categoryId) {
        scrollRef.current = null
      }
      return scrollRef.current ? prevState : categoryId
    })
  }, [])

  React.useEffect(() => {
    if (ratioRef.current.categoryId !== state.itemIdInView && state.ratio > ratioRef.current.ratio) {
      ratioRef.current = {
        ...ratioRef.current,
        categoryId: state.itemIdInView,
        ratio: state.ratio,
      }
    } else {
      ratioRef.current = { ...ratioRef.current, ratio: state.ratio ?? 0 }
    }
    ratioRef.current.categoryId && updateCurrentTab(ratioRef.current.categoryId)
  }, [state.itemIdInView, state.ratio, updateCurrentTab])

  return { currentTabId, ratio: ratioRef.current.ratio, setInViewState, setCurrentTabIdForce } as const
}
