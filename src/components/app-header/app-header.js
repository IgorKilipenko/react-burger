import React from "react"
import { ProfileIcon, BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex, Stack, Center } from "@chakra-ui/react"
import HeaderLink from "./header-link"
import { ResponsiveLogo } from "../logo"

const buildLinks = () => {
  const initializeLink =
    (element) =>
    ({ isActive, onClick }) =>
      React.cloneElement(element, {
        isActive,
        onClick: (value) => {
          onClick && onClick(value)
        },
      })

  return {
    burgerConstructor: {
      tag: "burgerConstructor",
      get element() {
        return initializeLink(<HeaderLink icon={BurgerIcon} text="Конструктор" value={this.tag} />)
      },
    },
    orderList: {
      tag: "orderList",
      get element() {
        return initializeLink(<HeaderLink icon={ListIcon} text="Лента заказов" value={this.tag} />)
      },
    },
    homeLink: {
      tag: "homeLink",
      get element() {
        return initializeLink(
          <HeaderLink>
            <ResponsiveLogo breakpoint={"md"} value={this.tag} />
          </HeaderLink>
        )
      },
    },
    userProfile: {
      tag: "userProfile",
      get element() {
        return initializeLink(<HeaderLink icon={ProfileIcon} text="Личный кабинет" value={this.tag} />)
      },
    },
  }
}

const AppHeader = ({ maxContentWidth = null, onChangeHeight = null }) => {
  const links = buildLinks()
  const [currentLink, setCurrentLink] = React.useState(links.burgerConstructor.tag)
  const headerRef = React.useRef()
  const [height, setHeight] = React.useState(0)

  const handleResizeHeight = () => {
    setHeight(headerRef.current?.clientHeight ?? 0)
  }

  React.useEffect(() => {
    handleResizeHeight()
  }, [headerRef])

  React.useEffect(() => {
    onChangeHeight && onChangeHeight(height)
  }, [onChangeHeight, height])

  const headerItems = [
    <Stack
      justify={{ base: "center", lg: "start" }}
      align={{ base: "start", lg: "center" }}
      spacing={{ base: 0, lg: 2 }}
      direction={{ base: "column", lg: "row" }}
    >
      {links.burgerConstructor.element({
        isActive: currentLink === links.burgerConstructor.tag,
        onClick: setCurrentLink,
      })}
      {links.orderList.element({ isActive: currentLink === links.orderList.tag, onClick: setCurrentLink })}
    </Stack>,
    <Flex justify="center" align="center">
      {links.homeLink.element({ isActive: currentLink === links.homeLink.tag, onClick: setCurrentLink })}
    </Flex>,
    <Flex justify="end">
      {links.userProfile.element({ isActive: currentLink === links.userProfile.tag, onClick: setCurrentLink })}
    </Flex>,
  ]

  return (
    <Center ref={headerRef} as="header" bg={"app-header-bg"} w="100%" pl={{ base: 2, lg: 0 }} pr={{ base: 2, lg: 0 }}>
      <Flex as="nav" maxW={maxContentWidth ?? "100%"} pt={4} pb={4} justify="space-between" align="center" w="100%">
        {headerItems.map((item, i) =>
          React.cloneElement(item, { key: `header-item-id-${i}`, flexGrow: 1, flexBasis: 0 })
        )}
      </Flex>
    </Center>
  )
}

export default AppHeader
