import { Flex } from "@chakra-ui/react"

export interface ModalOverlayProps {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const ModalOverlay = ({ children, onClick }: ModalOverlayProps) => {
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onClick && e.button === 0 && onClick(e)
  }
  return (
    <Flex bg="overlay-bg" justify="center" align="center" grow={1} onMouseDown={handleMouseDown}>
      {children}
    </Flex>
  )
}
