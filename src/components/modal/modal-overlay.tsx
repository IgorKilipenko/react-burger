import { Flex } from "@chakra-ui/react"

export interface ModalOverlayProps {
  children?: React.ReactNode
}

export const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return (
    <Flex bg="overlay-bg" justify="center" align="center" grow={1}>
      {children}
    </Flex>
  )
}
