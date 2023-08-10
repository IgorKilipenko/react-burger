import { Box, Flex, LayoutProps } from "@chakra-ui/react"
import { ModalHeader } from "./modal-header"
import { ModalContainer } from "./modal-container"
import { ModalCloseButton } from "./modal-close-button"
import { ModalOverlay } from "./modal-overlay"
import { appColors } from "../../theme/styles"

export interface ModalProps extends LayoutProps {
  children?: React.ReactNode
  isOpen?: boolean
  headerText?: string
  onClose?: () => void
}

export const Modal = ({ children, headerText, onClose, ...layoutProps }: ModalProps) => {
  return (
    <ModalContainer onEscKeyDown={onClose}>
      <ModalOverlay onClick={onClose}>
        <Flex
          position="absolute"
          direction="column"
          bg={appColors.bodyAltBackground}
          w={{ base: "lg", md: "720px" }}
          h="fit-content"
          p={10}
          align="stretch"
          borderRadius={40}
          {...layoutProps}
        >
          {headerText ? (
            <Flex gap={9} justify="space-between" align="center" h={16} mb={0} grow={1}>
              <ModalHeader text={headerText ?? ""} />
              <ModalCloseButton size={6} onClick={onClose} />
            </Flex>
          ) : (
            <Box position="absolute" top={6} right={6}>
              <ModalCloseButton size={6} onClick={onClose} />
            </Box>
          )}
          <Flex grow={1} justify="center">
            {children}
          </Flex>
        </Flex>
      </ModalOverlay>
    </ModalContainer>
  )
}
