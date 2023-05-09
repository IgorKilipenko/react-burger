import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { UserForm, UserFormDataState } from "../../components/user-form"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { authActions, getAuthStore } from "../../services/slices/auth"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { useLocation } from "react-router-dom"
import { appColors } from "../../theme/styles"

export const ProfilePage = () => {
  const authState = useAppSelector(getAuthStore)
  const location = useLocation()
  const dispatch = useAppDispatch()

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

  const handleSubmit = React.useCallback(
    (userData: UserFormDataState) => {
      const data = Object.entries(userData).reduce<Partial<Record<keyof UserFormDataState, string>>>(
        (res, [key, val]) => {
          const currVal = val.isValid ? val.value : undefined
          if (currVal) {
            res[key as keyof UserFormDataState] = currVal
          }
          return res
        },
        {}
      )
      dispatch(authActions.updateUser(data))
    },
    [dispatch]
  )

  const loadedUserData = React.useMemo(() => {
    if (!authState.isAuthenticatedUser) return undefined
    return {
      name: authState.user.name,
      email: authState.user.email,
      password: "",
    }
  }, [authState.isAuthenticatedUser, authState.user.email, authState.user.name])

  return (
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
        <Flex color={appColors.inactive}>
          <Text variant="mainDefault">В этом разделе вы можете изменить свои персональные данные</Text>
        </Flex>
      </Flex>
      <UserForm
        withEditIcons={true}
        values={loadedUserData}
        submitAction="Сохранить"
        onSubmit={handleSubmit}
      ></UserForm>
    </Flex>
  )
}
