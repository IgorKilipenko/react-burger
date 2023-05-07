import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { UserForm } from "../../components/user-form"
import { useAppSelector } from "../../services/store"
import { getAuthStore } from "../../services/slices/auth"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { useLocation } from "react-router-dom"

export const ProfilePage = () => {
  const authState = useAppSelector(getAuthStore)
  const location = useLocation()
  const placeholders = React.useMemo(() => {
    if (!authState.isAuthenticatedUser) return undefined

    return {
      name: authState.user.name,
      email: authState.user.email,
      password: Array(6)
        .fill("*")
        .reduce((acc, val) => acc + val),
    }
  }, [authState.isAuthenticatedUser, authState.user.email, authState.user.name])

  const buildLink = React.useCallback(
    ({ text, path }: { text: string; path: string }) => {
      return (
        <Flex w="320px" h="64px" align="center">
          <Link to={path} value={path} isActive={location.pathname === path}>
            <Text variant="mainMedium">{text}</Text>
          </Link>
        </Flex>
      )
    },
    [location.pathname]
  )

  return (
    <Flex align="center" justify="center" grow={1}>
      <Flex gap={15}>
        <Flex direction="column">
          <Flex direction="column" pb={20}>
            {buildLink({ text: "Профиль", path: routesInfo.profile.path })}
            {buildLink({ text: "История заказов", path: "#" })}
            {buildLink({ text: "Выход", path: "#" })}
          </Flex>
          <Flex color="link-inactive-color">
            <Text variant="mainDefault">В этом разделе вы можете изменить свои персональные данные</Text>
          </Flex>
        </Flex>
        <UserForm withEditIcons={true} values={placeholders}></UserForm>
      </Flex>
    </Flex>
  )
}
