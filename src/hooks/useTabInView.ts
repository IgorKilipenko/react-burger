import React from "react"

type ItemIdType = string | number

export interface TabItemBase {
  id: ItemIdType
}

export function useTabInView(tabs: TabItemBase[], lockScrollTimeout = 1000) {

  /// For InView items observe (set from outside)
  const [state, setState] = React.useState<{ itemIdInView: ItemIdType | null; ratio: number }>({
    itemIdInView: tabs[0]?.id,
    ratio: 1,
  })

  /// Calculated active tab (when ratio of item is maximum)
  const [currentTabId, setCurrentTabId] = React.useState<ItemIdType | null>(state.itemIdInView)

  /// For observe when max in view ratio changed for item
  const primaryTabRef = React.useRef({ categoryId: state.itemIdInView, ratio: state.ratio })

  /// For disable change active tab when force scrolling
  const forceScrollToRef = React.useRef<ItemIdType | null>(null)  

  /// Set active tab (set when onTabClick for example)
  const setCurrentTabIdForce = React.useCallback(
    (id: ItemIdType) => {
      forceScrollToRef.current = id
      setCurrentTabId(id)
      setTimeout(() => {
        if (forceScrollToRef.current === id) {
          forceScrollToRef.current = null
        }
      }, lockScrollTimeout)
    },
    [lockScrollTimeout]
  )
  
  /// Update active tab if not force scroll
  const updateCurrentTab = React.useCallback((categoryId: ItemIdType) => {
    setCurrentTabId((prevState) => {
      if (forceScrollToRef.current && forceScrollToRef.current === categoryId) {
        forceScrollToRef.current = null
      }
      return forceScrollToRef.current ? prevState : categoryId
    })
  }, [])

  /// Calculate active tab when scrolling
  const calculateActiveTab = React.useCallback(
    (prevState: typeof state) => {
      if (
        primaryTabRef.current.categoryId !== prevState.itemIdInView &&
        prevState.ratio > primaryTabRef.current.ratio
      ) {
        primaryTabRef.current = {
          categoryId: prevState.itemIdInView,
          ratio: prevState.ratio,
        }
      } else if (primaryTabRef.current.categoryId === prevState.itemIdInView) {
        primaryTabRef.current = { ...primaryTabRef.current, ratio: prevState.ratio ?? 0 }
      }
      primaryTabRef.current.categoryId && updateCurrentTab(primaryTabRef.current.categoryId)
    },
    [updateCurrentTab]
  )

  /// Set from outside itemInView state
  const setInViewState = React.useCallback<typeof setState>(
    (state) => {
      setState((prevState) => {
        const inViewItem = typeof state === "function" ? state(prevState) : state
        calculateActiveTab(prevState)
        return inViewItem
      })
    },
    [calculateActiveTab]
  )

  return { currentTabId, ratio: primaryTabRef.current.ratio, setInViewState, setCurrentTabIdForce } as const
}
