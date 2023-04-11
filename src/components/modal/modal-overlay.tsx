import { Flex } from "@chakra-ui/react"
import React from "react"

export interface ModalOverlayProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const ModalOverlay = ({ children, onClick }: ModalOverlayProps) => {
  const clickTargetRef = React.useRef<HTMLDivElement>(null)

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === clickTargetRef.current && e.button === 0) {
      e.stopPropagation()
      onClick && onClick(e)
    }
  }
  return (
    <Flex ref={clickTargetRef} bg="overlay-bg" justify="center" align="center" grow={1} onMouseDown={handleMouseDown}>
      {children}
    </Flex>
  )
}
