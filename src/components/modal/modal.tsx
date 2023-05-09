import { Flex } from "@chakra-ui/react"
import { ModalHeader } from "./modal-header"
import { ModalContainer } from "./modal-container"
import { ModalCloseButton } from "./modal-close-button"
import { ModalOverlay } from "./modal-overlay"
import { appColors } from "../../theme/styles"

export interface ModalProps {
  children?: React.ReactNode
  isOpen?: boolean
  headerText?: string
  onClose?: () => void
}

export const Modal = ({ children, headerText, onClose }: ModalProps) => {
  return (
    <ModalContainer onEscKeyDown={onClose}>
      <ModalOverlay onClick={onClose}>
        <Flex
          direction="column"
          bg={appColors.bodyAltBackground}
          m="auto"
          w={{ base: "lg", md: "720px" }}
          h="fit-content"
          p={10}
          align="stretch"
          borderRadius={40}
        >
          <Flex gap={9} justify="space-between" align="center" h={16} mb={0} grow={1}>
            <ModalHeader text={headerText ?? ""} />
            <ModalCloseButton size={6} onClick={onClose} />
          </Flex>
          <Flex grow={1} justify="center">
            {children}
          </Flex>
        </Flex>
      </ModalOverlay>
    </ModalContainer>
  )
}
