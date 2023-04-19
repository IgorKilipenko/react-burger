import React from "react"
import { Flex, Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Link as ChakraLink } from "@chakra-ui/react"
import { Icon } from "../icon"

export interface LinkProps {
  icon?: React.ElementType<any>
  text?: string
  children?: React.ReactNode
  isActive?: boolean
  value?: string | number
  onClick?: (value?: string | number) => void
}

export const Link = React.forwardRef<HTMLDivElement, LinkProps>(
  ({ icon, text, children, isActive = false, onClick, value }, ref) => {
    const type = isActive ? "primary" : "secondary"
    const _onClick = () => onClick && onClick(value)

    const containerProps = {
      pt: { base: 1, lg: 4 },
      pb: { base: 1, lg: 4 },
      pl: { base: 0, lg: 5 },
      pr: { base: 0, lg: 5 },
    }

    return (
      <Box ref={ref} {...(!children ? containerProps : {})}>
        {children ? (
          <ChakraLink onClick={_onClick} variant={type}>
            {children}
          </ChakraLink>
        ) : (
          <ChakraLink as={Flex} align="center" onClick={_onClick} gap={icon && text ? 2 : 0} variant={type}>
            {icon && <Icon as={icon} type={type} />}
            {text && <Text variant={"mainDefault"}>{text}</Text>}
          </ChakraLink>
        )}
      </Box>
    )
  }
)
