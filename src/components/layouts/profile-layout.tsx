import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { useAppDispatch } from "../../services/store"
import { authActions } from "../../services/slices/auth"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { Outlet, useLocation } from "react-router-dom"
import { appColors } from "../../theme/styles"
import { FlexOptions } from "../../utils/types"

export interface ProfileLayoutProps extends FlexOptions {}

export const ProfileLayout = React.memo<ProfileLayoutProps>(() => {
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

  const sectionInfoMessage = React.useMemo(() => {
    if (location.pathname === routesInfo.profile.path) {
      return "В этом разделе вы можете изменить свои персональные данные"
    } else if (location.pathname === routesInfo.orders.path) {
      return "В этом разделе вы можете посмотреть свою историю заказов"
    }
    return null
  }, [location.pathname])

  return (
    <Flex align="start" gap={15} mt="28">
      <Flex direction="column" w="min-content">
        <Flex direction="column" pb={30} w="320px">
          {buildLink({ text: "Профиль", path: routesInfo.profile.path })}
          {buildLink({ text: "История заказов", path: routesInfo.orders.path })}
          {buildLink({
            text: "Выход",
            onClick: () => {
              dispatch(authActions.logout())
            },
          })}
        </Flex>
        {sectionInfoMessage ? (
          <Flex color={appColors.inactive}>
            <Text variant="mainDefault">{sectionInfoMessage}</Text>
          </Flex>
        ) : null}
      </Flex>
      <Flex minW="844px">
        <Outlet />
      </Flex>
    </Flex>
  )
})
