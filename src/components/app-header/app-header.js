import React from "react"
import { ProfileIcon, BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex, HStack, Stack} from "@chakra-ui/react"
import HeaderLink from "./header-link"
import { ResponsiveLogo } from "../logo"

const AppHeader = () => {
  const headerItems = [
    <Stack
      as="nav"
      justify={{ base: "center", lg: "start" }}
      align={{ base: "start", lg: "center" }}
      spacing={{ base: 0, lg: 2 }}
      direction={{ base: "column", lg: "row" }}
    >
      <HeaderLink icon={BurgerIcon} text="Конструктор" isActive={true} />
      <HeaderLink icon={ListIcon} text="Лента заказов" />
    </Stack>,
    <HStack justify="center" align="center">
      <ResponsiveLogo breakpoint={'md'}/>
    </HStack>,
    <HStack justify="end">
      <HeaderLink icon={ProfileIcon} text="Личный кабинет" />
    </HStack>,
  ]

  return (
    <Flex as="header" pt={4} pb={4} justify="space-between" align="center" width="100%">
      {headerItems.map((item, i, arr) => React.cloneElement(item, { key: i, width: `calc(100% / ${arr.length})` }))}
    </Flex>
  )
}

export default AppHeader
