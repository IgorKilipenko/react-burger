import { Flex } from "@chakra-ui/react"
import React from "react"
import { authActions } from "../../services/slices/auth"
import { useAppDispatch } from "../../services/store"
import { FlexOptions } from "../../utils/types"

export interface ProfileContainerProps extends FlexOptions {
  children: React.ReactElement
}

export const ProfileContainer = React.memo<ProfileContainerProps>(({children, ...restProps}) => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    return () => {
      dispatch(authActions.clearErrors())
    }
  },[dispatch])

  return <Flex align="center" justify="center" grow={1} {...(restProps as FlexOptions)}>
    {children}
  </Flex>
})
