import React from "react"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import AppHeader from "../app-header"
import theme from "../../theme/theme"
import { MainContainer } from "./main-container"
import { Routes, Route } from "react-router-dom"
import { HomePage, NotFoundPage } from "../../pages"

const AppRoutes = {
  home: { path: "/", element: <HomePage /> },
  login: { path: "/login", element: null },
  register: { path: "/register", element: null },
  forgotPassword: { path: "/forgot-password", element: null },
  resetPassword: { path: "/reset-password", element: null },
  profile: { path: "/profile", element: null },
  ingredientItem: { path: "/ingredients/:id", element: null },
  notfound: { path: "*", element: <NotFoundPage /> },
}

const App = () => {
  const [headerHeight, setHeight] = React.useState(0)
  const maxContentWidth = theme.sizes.container.maxContentWidth

  const handleHeaderChangeHeight = (value: number) => {
    setHeight(value)
  }

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
        <AppHeader onChangeHeight={handleHeaderChangeHeight} />
        <MainContainer maxContentWidth={maxContentWidth} height={`calc(100% - ${headerHeight}px)`}>
          <Routes>
            <Route {...AppRoutes.home} />
            <Route {...AppRoutes.notfound} />
          </Routes>
        </MainContainer>
      </Flex>
    </ChakraProvider>
  )
}

export default App
