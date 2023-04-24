import React from "react"
import { isTouchEnabled } from "../utils"

export const useIsTouchEnabled = (): boolean => {
  const [state, setState] = React.useState<boolean>(false)

  React.useEffect(() => {
    setState(isTouchEnabled)
  }, [])

  return state
}
