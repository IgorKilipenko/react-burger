import PropTypes from "prop-types"
import { HStack, Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Link } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"

const HeaderLink = ({ icon, text, children, isActive = false, onClick, value }) => {
  const type = isActive ? "primary" : "secondary"
  const _onClick = () => onClick(value)

  return children ? (
    <Link onClick={_onClick} variant={type}>{children}</Link>
  ) : (
    <Box pt={{ base: 1, lg: 4 }} pb={{ base: 1, lg: 4 }} pl={{ base: 0, lg: 5 }} pr={{ base: 0, lg: 5 }}>
      <Link as={HStack} onClick={_onClick} spacing={icon && text ? 2 : 0} variant={type}>
        {icon && (
          <Box>
            <Icon as={icon} type={type} />
          </Box>
        )}
        {text && (
          <Text variant={'mainDefault'}>
            {text}
          </Text>
        )}
      </Link>
    </Box>
  )
}

HeaderLink.propTypes = {
  icon: PropTypes.elementType,
  text: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
}

export default HeaderLink
