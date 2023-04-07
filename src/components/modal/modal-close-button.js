import { Circle, useMultiStyleConfig, createStylesContext } from "@chakra-ui/react"
import { CloseIcon } from "../common/icons"
import { Icon } from "../common/icon"

export const ModalCloseButton = ({ size = 6, variant = "primary" }) => {
  const styles = useMultiStyleConfig("ModalCloseButton", { size, variant })
  const [StylesProvider] = createStylesContext("ModalCloseButton")
  return (
    <Circle p={1} __css={styles.container}>
      <StylesProvider value={styles}>
        <Icon boxSize={size} as={CloseIcon} type={variant} __css={styles.icon} />
      </StylesProvider>
    </Circle>
  )
}
