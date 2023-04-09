import { Flex } from "@chakra-ui/react"
import { ModalHeader } from "./modal-header"
import { ModalContainer } from "./modal-container"
import { ModalCloseButton } from "./modal-close-button"

export interface ModalContentProps {
  children?: React.ReactNode
}

const ModalOverlay = ({ children }: ModalContentProps) => {
  return (
    <Flex bg="overlay-bg" justify="center" align="center" grow={1}>
      {children}
    </Flex>
  )
}

export interface ModalProps {
  children?: React.ReactNode
  isOpen?: boolean
  headerText?: string
  onCloseClick?: () => void
  onEscKeyDown?: (event: KeyboardEvent) => void
}

export const Modal = ({ children, isOpen = false, headerText, onCloseClick }: ModalProps) => {
  return isOpen ? (
    <ModalContainer onEscKeyDown={onCloseClick}>
      <ModalOverlay>
        <Flex
          direction="column"
          bg="alt-body-bg"
          m="auto"
          w={{ base: "lg", md: "720px" }}
          h="fit-content"
          p={10}
          pb="40px"
          align="stretch"
          borderRadius={40}
        >
          <Flex gap={9} justify="space-between" align="center" h={16} mb={0} grow={1}>
            <ModalHeader text={headerText ?? ""} />
            <ModalCloseButton size={6} onClick={onCloseClick} />
          </Flex>
          <Flex grow={1} justify="center">
            {children}
          </Flex>
        </Flex>
      </ModalOverlay>
    </ModalContainer>
  ) : null
}
