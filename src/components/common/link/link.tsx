import React from "react"
import { Flex, Box, Text, TextProps } from "@chakra-ui/react"
import { Link as ChakraLink } from "@chakra-ui/react"
import { Icon } from "../icon"
import { useNavigate } from "react-router-dom"

export interface LinkProps {
  to?: string,
  icon?: React.ElementType<any>
  text?: string
  textColor?: TextProps['color']
  children?: React.ReactNode
  isActive?: boolean
  value?: string | number
  onClick?: (value?: string | number) => void
}

export const Link = React.forwardRef<HTMLDivElement, LinkProps>(
  ({ to, icon, text, textColor, children, isActive = false, onClick, value }, ref) => {
    const type = isActive ? "primary" : "secondary"
    const navigate = useNavigate()

    const _onClick = React.useCallback(() => {
      onClick && onClick(value)
      to && navigate(to)

    },[navigate, onClick, to, value]);

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
            {text && <Text color={textColor} variant={"mainDefault"}>{text}</Text>}
          </ChakraLink>
        )}
      </Box>
    )
  }
)
