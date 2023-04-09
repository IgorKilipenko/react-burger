import React, { useState } from "react"
import { type ModalContextType } from "./modal-context"

export type ModalContextProps = {
  context: React.Context<ModalContextType>
  children: React.ReactNode
}

export function ModalContextProvider({ children, context }: ModalContextProps) {
  const [state, setState] = useState<boolean>(false)

  const setOpened = (value: boolean) => {
    setState(value)
  }

  const contextValue: ModalContextType = {
    isOpened: state,
    setOpened: (value) => setOpened(value),
  }

  return <context.Provider value={contextValue}>{children}</context.Provider>
}
