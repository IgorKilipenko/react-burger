import React from "react"
import { Flex, Center } from "@chakra-ui/react"
import { useHeight } from "../../utils/hooks/useSize"
import { AppHeaderPropType } from "./app-header.types"
import { buildLinks } from "./build-links"
import { useMultiStyleConfig } from "@chakra-ui/react"

const AppHeader = React.memo(({ variant = "desktop", onChangeHeight = null }) => {
  const links = buildLinks()
  const [currentLink, setCurrentLink] = React.useState(links.burgerConstructor.tag)
  const headerRef = React.useRef()
  const height = useHeight(headerRef)
  const styles = useMultiStyleConfig("AppHeader", { variant })

  React.useEffect(() => {
    onChangeHeight && onChangeHeight(height)
  }, [onChangeHeight, height])

  const headerItems = [
    (props) => (
      <Flex
        justify={{ base: "center", lg: "start" }}
        align={{ base: "start", lg: "center" }}
        gap={{ base: 0, lg: 2 }}
        direction={{ base: "column", lg: "row" }}
        {...props}
      >
        {links.burgerConstructor.element({
          isActive: currentLink === links.burgerConstructor.tag,
          onClick: setCurrentLink,
        })}
        {links.orderList.element({ isActive: currentLink === links.orderList.tag, onClick: setCurrentLink })}
      </Flex>
    ),
    (props) => (
      <Flex justify="center" align="center" {...props}>
        {links.homeLink.element({ isActive: currentLink === links.homeLink.tag, onClick: setCurrentLink })}
      </Flex>
    ),
    (props) => (
      <Flex justify="end" {...props}>
        {links.userProfile.element({ isActive: currentLink === links.userProfile.tag, onClick: setCurrentLink })}
      </Flex>
    ),
  ]

  return (
    <Center ref={headerRef} as="header" {...styles.container}>
      <Flex as="nav" {...styles.nav}>
        {headerItems.map((item, i) => item({ key: `header-item-id-${i}`, ...styles.items }))}
      </Flex>
    </Center>
  )
})

AppHeader.propTypes = AppHeaderPropType

export default AppHeader
