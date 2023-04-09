import { Flex } from "@chakra-ui/react"
import { ModalHeader } from "./modal-header"
import { ModalContainer } from "./modal-container"
import { ModalCloseButton } from "./modal-close-button"
import { ModalOverlay } from "./modal-overlay"

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
      <ModalOverlay onClick={onCloseClick}>
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
