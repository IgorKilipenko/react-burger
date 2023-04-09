import { Flex, Text } from "@chakra-ui/react"
import { ModalHeader } from "./modal-header"
import { ModalContainer } from "./modal-container"
import { ModalCloseButton } from "./modal-close-button"

export const Modal = ({ isOpen = false, onCloseClick }) => {
  return (
    isOpen && (
      <ModalContainer>
        <Flex direction='column' justify='stretch' w='lg' >
          <Flex gap={9} h={16} justify='space-between' align='center' bg='alt-body-bg'>
            <ModalHeader text={"HEADER"} />
            <ModalCloseButton size={6} onClick={onCloseClick} />
          </Flex>
          <Flex>
            <Text>CONTENT</Text>
          </Flex>
        </Flex>
      </ModalContainer>
    )
  )
}
