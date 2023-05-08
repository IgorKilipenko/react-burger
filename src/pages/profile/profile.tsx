import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { UserForm } from "../../components/user-form"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { authActions, getAuthStore } from "../../services/slices/auth"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { useLocation } from "react-router-dom"

export const ProfilePage = () => {
  const authState = useAppSelector(getAuthStore)
  const location = useLocation()
  const dispatch = useAppDispatch()
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
    ({ text, path, onClick }: { text: string; onClick?: () => void; path?: string }) => {
      return (
        <Flex w="100%" h="64px" align="center">
          <Link to={path} onClick={onClick} value={path} isActive={location.pathname === path}>
            <Text variant="mainMedium">{text}</Text>
          </Link>
        </Flex>
      )
    },
    [location.pathname]
  )

  return (
    <Flex align="start" justify="center" grow={1}>
      <Flex gap={15} mt="28">
        <Flex direction="column" w="min-content">
          <Flex direction="column" pb={30} w="320px">
            {buildLink({ text: "Профиль", path: routesInfo.profile.path })}
            {buildLink({ text: "История заказов", path: "#" })}
            {buildLink({
              text: "Выход",
              onClick: () => {
                dispatch(authActions.logout())
              },
            })}
          </Flex>
          <Flex color="link-inactive-color">
            <Text variant="mainDefault">В этом разделе вы можете изменить свои персональные данные</Text>
          </Flex>
        </Flex>
        <UserForm withEditIcons={true} values={placeholders} />
      </Flex>
    </Flex>
  )
}
