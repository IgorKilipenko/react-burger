import React from "react"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import theme from "../../theme/theme"
import { Outlet } from "react-router-dom"

/*
const AppRoutes = {
  home: { index: true, element: <HomePage /> },
  login: { path: "/login", element: null },
  register: { path: "/register", element: null },
  forgotPassword: { path: "/forgot-password", element: null },
  resetPassword: { path: "/reset-password", element: null },
  profile: { path: "/profile", element: null },
  ingredientItem: { path: "/ingredients/:id", element: null },
  notfound: { path: "*", element: <NotFoundPage /> },
}*/

const App = () => {
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
