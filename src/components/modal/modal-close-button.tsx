import { Circle, useMultiStyleConfig, type LayoutProps } from "@chakra-ui/react"
import { CloseIcon } from "../common/icons"
import { Icon } from "../common/icon"

export interface ModalCloseButtonProps {
  size?: LayoutProps["boxSize"]
  variant?: string
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const ModalCloseButton = ({ size = 6, variant = "primary", onClick }: ModalCloseButtonProps) => {
  const styles = useMultiStyleConfig("ModalCloseButton", { size, variant })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    onClick && onClick(e)
  }

  return (
    <Circle p={1} __css={styles.container} onClick={handleClick}>
      <Icon boxSize={size} as={CloseIcon} type={variant} __css={styles.icon} />
    </Circle>
  )
}
