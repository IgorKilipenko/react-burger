import React from "react"
import ReactDOM from "react-dom"
import { Box } from "@chakra-ui/react"

const modalRootElementId = "react-modals"
const modalRoot = document.getElementById(modalRootElementId) as Element

export type Ref = HTMLDivElement | null

export interface ModalPortalProps {
  children?:React.ReactNode
}

export const ModalPortal = React.forwardRef<Ref, ModalPortalProps>(({ children }, ref) => {
  return ReactDOM.createPortal(<Box ref={ref}>{children}</Box>, modalRoot)
})