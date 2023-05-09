import React from "react"
import { Flex } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router-dom"
import { usePrevious } from "../../hooks"
import { authActions } from "../../services/slices/auth"
import { useAppDispatch } from "../../services/store"
import { FlexOptions } from "../../utils/types"

export interface ProfileContainerProps extends FlexOptions {}

export const ProfileContainer = React.memo<ProfileContainerProps>((props) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const prevPathname = usePrevious<string>(location.pathname)

  React.useEffect(() => {
    return () => {
      if (prevPathname && prevPathname !== location.pathname) {
        dispatch(authActions.clearErrors())
      }
    }
  }, [dispatch, location.pathname, prevPathname])

  return (
    <Flex direction="column" align="center" justify="center" grow={1} {...(props as FlexOptions)}>
      <Outlet />
    </Flex>
  )
})
