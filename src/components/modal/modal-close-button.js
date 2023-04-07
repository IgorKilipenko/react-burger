import { Box, Square, useMultiStyleConfig, useStyleConfig } from "@chakra-ui/react"
import { CloseIcon } from "../common/icons"
import { Icon } from "../common/icon"

/*
export const ModalCloseButton = ({ size, variant }) => {
  const styles = useMultiStyleConfig("ModalCloseButton", { size, variant })
  //const styles = useStyleConfig("ModalCloseButton", { size, variant })
  return (
    <Square size={100} __css={styles.container}>
      <Icon __css={styles.icon} svg={CloseIcon} boxSize={5} color={'green.700'} />
    </Square>
  )
}
*/

export const ModalCloseButton = ({ size, variant }) => {
  const styles = useMultiStyleConfig("ModalCloseButton", { size, variant })
  //const styles = useStyleConfig("ModalCloseButton", { size, variant })
  return (
    <Square __css={styles.container}>
      <Icon boxSize={6} as={CloseIcon} __css={styles.icon} /*color={'green.700'}*/ type="error" />
    </Square>
  )
}