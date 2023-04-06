import React from "react"
import { Flex, Center } from "@chakra-ui/react"
import { useHeight } from "../../utils/hooks/useSize"
import { AppHeaderPropType } from "./app-header.types"
import { buildLinks } from "./build-links"

const AppHeader = React.memo(({ maxContentWidth = null, onChangeHeight = null }) => {
  const links = buildLinks()
  const [currentLink, setCurrentLink] = React.useState(links.burgerConstructor.tag)
  const headerRef = React.useRef()
  const height = useHeight(headerRef)

  React.useEffect(() => {
    onChangeHeight && onChangeHeight(height)
  }, [onChangeHeight, height])

  const headerItems = [
    <Flex
      justify={{ base: "center", lg: "start" }}
      align={{ base: "start", lg: "center" }}
      gap={{ base: 0, lg: 2 }}
      direction={{ base: "column", lg: "row" }}
    >
      {links.burgerConstructor.element({
        isActive: currentLink === links.burgerConstructor.tag,
        onClick: setCurrentLink,
      })}
      {links.orderList.element({ isActive: currentLink === links.orderList.tag, onClick: setCurrentLink })}
    </Flex>,
    <Flex justify="center" align="center">
      {links.homeLink.element({ isActive: currentLink === links.homeLink.tag, onClick: setCurrentLink })}
    </Flex>,
    <Flex justify="end">
      {links.userProfile.element({ isActive: currentLink === links.userProfile.tag, onClick: setCurrentLink })}
    </Flex>,
  ]

  return (
    <Center ref={headerRef} as="header" bg={"app-header-bg"} w="100%" pl={{ base: 2, lg: 0 }} pr={{ base: 2, lg: 0 }}>
      <Flex as="nav" maxW={maxContentWidth} pt={4} pb={4} justify="space-between" align="center" w="100%">
        {headerItems.map((item, i) =>
          React.cloneElement(item, { key: `header-item-id-${i}`, flexGrow: 1, flexBasis: 0 })
        )}
      </Flex>
    </Center>
  )
})

AppHeader.propTypes = AppHeaderPropType

export default AppHeader
