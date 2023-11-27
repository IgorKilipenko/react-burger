import {
  type FlexProps as ChakraFlexProps,
  type IconProps as ChakraIconProps,
  Icon as ChakraIcon,
  Flex,
} from "@chakra-ui/react"

export declare type IconProps = ChakraIconProps & ChakraFlexProps & object

export const Icon = ({ as, type, children, boxSize, color, viewBox, ...containerProps }: IconProps) => {
  const iconProps = {
    as,
    children,
    boxSize,
    color,
    viewBox,
  }
  return (
    <Flex {...containerProps}>
      <ChakraIcon {...iconProps} variant={type} />
    </Flex>
  )
}
