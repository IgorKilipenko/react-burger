import { Square, useMultiStyleConfig } from "@chakra-ui/react"
import { CloseIcon } from "../common/icons"
import { Icon } from "../common/icon"

export const ModalCloseButton = ({ size, variant }) => {
  const styles = useMultiStyleConfig("ModalCloseButton", { size, variant })
  return (
    <Square __css={styles.container}>
      <Icon boxSize={6} as={CloseIcon} __css={styles.icon} type="error" />
    </Square>
  )
}
