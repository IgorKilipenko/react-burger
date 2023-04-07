import React from "react"
import ReactDOM from "react-dom"
import { Box } from "@chakra-ui/react"

const modalRootElementId = "react-modals"
const modalRoot = document.getElementById(modalRootElementId)

export const ModalPortal = React.forwardRef(({ children }, ref) => {
  return ReactDOM.createPortal(<Box ref={ref}>{children}</Box>, modalRoot)
})