import React from "react"

export interface ModalContextType {
  isOpened: boolean
  setOpened: (value:boolean) => void
}

const defaultContext: ModalContextType = {
  isOpened: false,
  setOpened: () => {},
}

export function CreateModalContext() {
  return React.createContext<ModalContextType>(defaultContext)
}

export const ModalContext = CreateModalContext()

export const useModalContext = () => React.useContext(ModalContext)
