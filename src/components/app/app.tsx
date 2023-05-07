import React from "react"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import theme from "../../theme/theme"
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { authActions, getIsAuthUserFromStore } from "../../services/slices/auth"

const App = () => {
  const dispatch = useAppDispatch()
  const isAuthenticatedUser = useAppSelector(getIsAuthUserFromStore)

  React.useEffect(() => {
    !isAuthenticatedUser && dispatch(authActions.getUser())
  }, [dispatch, isAuthenticatedUser])

  return (
    <ChakraProvider theme={theme}>
      <Flex
        position="absolute"
        width="100vw"
        height="100vh"
        direction="column"
        align="stretch"
        justify="stretch"
        overflow="hidden"
      >
        <Outlet />
      </Flex>
    </ChakraProvider>
  )
}

export default App
