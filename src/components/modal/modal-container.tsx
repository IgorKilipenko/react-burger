import { ReactNode } from "react"
import { Flex } from "@chakra-ui/react"
import { ModalPortal } from "./modal-portal"
import React from "react"

export interface ModalContainerProps {
  children?: ReactNode
  onEscKeyDown?: () => void
}

export const ModalContainer = ({ children, onEscKeyDown }: ModalContainerProps) => {
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (onEscKeyDown && e.code === "Escape") {
        onEscKeyDown()
      }
    },
    [onEscKeyDown]
  )

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <ModalPortal>
      <Flex position="absolute" w="100vw" h="100vh" justify="stretch" align="stretch" zIndex="overlay">
        {children}
      </Flex>
    </ModalPortal>
  )
}
