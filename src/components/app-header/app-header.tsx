import React from "react"
import { Flex, Center, type FlexProps } from "@chakra-ui/react"
import { useHeight } from "../../hooks/useSize"
import { buildLinks } from "./build-links"
import { useMultiStyleConfig } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"

export interface AppHeaderProps {
  variant?: string
  onChangeHeight?: (value: number) => void
}

const AppHeader = React.memo<AppHeaderProps>(({ variant = "desktop", onChangeHeight }) => {
  const location = useLocation()
  const links = buildLinks()
  const [currentLink, setCurrentLink] = React.useState<string | number | undefined>(location.pathname)
  const headerRef = React.useRef<HTMLDivElement | null>(null)
  const height = useHeight(headerRef)
  const styles = useMultiStyleConfig("AppHeader", { variant })

  React.useEffect(() => {
    onChangeHeight && onChangeHeight(height)
  }, [onChangeHeight, height])

  React.useEffect(() => {
    setCurrentLink(location.pathname)
  }, [location.pathname])

  const headerItems = [
    (props: FlexProps) => (
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
    (props: FlexProps) => (
      <Flex justify="center" align="center" {...props}>
        {links.homeLink.element({ isActive: currentLink === links.homeLink.tag, onClick: setCurrentLink })}
      </Flex>
    ),
    (props: FlexProps) => (
      <Flex justify="end" {...props}>
        {links.userProfile.element({
          isActive: links.userProfile.validTags.some((tag) => tag === currentLink),
          onClick: setCurrentLink,
        })}
      </Flex>
    ),
  ]

  return (
    <Center ref={headerRef} as="header" {...(styles.container as FlexProps)}>
      <Flex as="nav" {...(styles.nav as FlexProps)}>
        {headerItems.map((item, i) => item({ key: `header-item-id-${i}`, ...(styles.items as FlexProps) }))}
      </Flex>
    </Center>
  )
})

export default AppHeader
