import React from "react"
import { Icon as ChakraIcon, Flex } from "@chakra-ui/react"
import { type FlexProps as ChakraFlexProps, type IconProps as ChakraIconProps } from "@chakra-ui/react"

export declare type IconProps = ChakraIconProps & ChakraFlexProps & {}

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
