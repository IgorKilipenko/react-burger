import React from "react"
import { Flex, FlexboxProps, SpaceProps } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"
import { usePrevious } from "../../hooks"
import { authActions, getAuthStore } from "../../services/slices/auth"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { FlexOptions } from "../../utils/types"
import { routesInfo } from "../../components/app-router"
import { getAppIsBackgroundRouteMode } from "../../services/slices/app"

export interface ProfileContainerProps extends FlexOptions, FlexboxProps, SpaceProps {
}

export const ProfileContainer = React.memo<ProfileContainerProps>(({ ...restProps }) => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector(getAuthStore)
  const location = useLocation()
  const prevPathname = usePrevious<string>(location.pathname)
  const isBackgroundMode = useAppSelector(getAppIsBackgroundRouteMode)

  React.useEffect(() => {
    if (prevPathname && prevPathname !== location.pathname) {
      authState.error && dispatch(authActions.clearErrors())
    }
  }, [authState.error, dispatch, location.pathname, prevPathname])

  const containerOptions = React.useMemo(() => {
    if (!isBackgroundMode && location.pathname.match(`${routesInfo.profile.path}.*`)) {
      return {
        justify:"start",
        align:"stretch"
      }
    } 
    return {}
  },[isBackgroundMode, location.pathname])

  return (
    <Flex direction="column" align="center" justify="center" grow={1} {...containerOptions} {...restProps}>
      <Outlet />
    </Flex>
  )
})
