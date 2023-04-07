import React from "react"
import PropTypes from "prop-types"
import { Flex, Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Link as ChakraLink } from "@chakra-ui/react"
import { Icon } from "../icon"

const Link = React.memo(({ icon, text, children, isActive = false, onClick, value }) => {
  const type = isActive ? "primary" : "secondary"
  const _onClick = () => onClick(value)

  return children ? (
    <ChakraLink onClick={_onClick} variant={type}>
      {children}
    </ChakraLink>
  ) : (
    <Box pt={{ base: 1, lg: 4 }} pb={{ base: 1, lg: 4 }} pl={{ base: 0, lg: 5 }} pr={{ base: 0, lg: 5 }}>
      <ChakraLink as={Flex} align="center" onClick={_onClick} gap={icon && text ? 2 : 0} variant={type}>
        {icon && <Icon as={icon} type={type} />}
        {text && <Text variant={"mainDefault"}>{text}</Text>}
      </ChakraLink>
    </Box>
  )
})

Link.propTypes = {
  icon: PropTypes.elementType,
  text: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
}

export { Link }
