import React from "react"
import { Flex } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"
import { usePrevious } from "../../hooks"
import { authActions, getAuthStore } from "../../services/slices/auth"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { FlexOptions } from "../../utils/types"

export interface ProfileContainerProps extends FlexOptions {}

export const ProfileContainer = React.memo<ProfileContainerProps>((props) => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector(getAuthStore)
  const location = useLocation()
  const prevPathname = usePrevious<string>(location.pathname)

  React.useEffect(() => {
    if (prevPathname && prevPathname !== location.pathname) {
      authState.error && dispatch(authActions.clearErrors())
    }
  }, [authState.error, dispatch, location.pathname, prevPathname])

  return (
    <Flex direction="column" align="center" justify="center" grow={1} {...(props as FlexOptions)}>
      <Outlet />
    </Flex>
  )
})
