import PropTypes from "prop-types"
import { HStack, Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Link } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"

const HeaderLink = ({ icon, text, isActive = false }) => {
  return (
    <Box pt={{ base: 1, lg: 4 }} pb={{ base: 1, lg: 4 }} pl={{ base: 0, lg: 5 }} pr={{ base: 0, lg: 5 }}>
      <Link as={HStack} spacing={icon ? 2 : 0} variant={"primary"}>
        {icon && (
          <Box>
            <Icon as={icon} type={isActive ? "primary" : "secondary"} />
          </Box>
        )}
        <Text fontWeight="normal" /*whiteSpace='nowrap'*/ lineHeight="normal" className="text text_type_main-default">
          {text}
        </Text>
      </Link>
    </Box>
  )
}

HeaderLink.propTypes = {
  icon: PropTypes.elementType,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
}

export default HeaderLink
