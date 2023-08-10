import { CircularProgress, Flex, Text } from "@chakra-ui/react"
import { FlexOptions } from "../../../utils/types"

export interface LoadingProgressProps extends Omit<FlexOptions, "dir" | "direction"> {
  text?: string | null
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({ text, ...restProps }) => {
  return (
    <Flex direction="column" align="center" justify="center" grow={1} {...restProps}>
      <CircularProgress isIndeterminate color="accent-color" />
      {text ? <Text variant="mainDefault">{text}</Text> : null}
    </Flex>
  )
}
