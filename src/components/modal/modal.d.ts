import React from "react"

export interface ModalProps {
  isOpen?: boolean,
  onCloseClick?: () => void
}

declare const Modal: React.FC<ModalProps>

export {Modal}