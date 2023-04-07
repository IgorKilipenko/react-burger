import { Flex } from "@chakra-ui/react"
import { ModalPortal } from "./modal-portal"


export const ModalContainer = ({ children }) => {
  return (
    <ModalPortal>
      <Flex position="absolute" w="100vw" h="100vh" justify="center" align="center" zIndex="modal">
        {children}
      </Flex>
    </ModalPortal>
  )
}