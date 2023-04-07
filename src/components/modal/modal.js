import { ModalHeader } from "./modal-header"
import { ModalContainer } from "./modal-container"

export const Modal = ({ isOpen = false }) => {
  return (
    isOpen && (
      <ModalContainer>
        <ModalHeader />
      </ModalContainer>
    )
  )
}
