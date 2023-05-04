import React from "react"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import AppHeader from "../app-header"
import theme from "../../theme/theme"
import { MainContainer } from "./main-container"
import { Routes, Route } from "react-router-dom"
import { HomePage } from "../../pages"

const AppRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  profile: "/profile",
  ingredientItem: "/ingredients/:id"
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
            <Route path={AppRoutes.home} element={<HomePage />}/>
          </Routes>
        </MainContainer>
      </Flex>
    </ChakraProvider>
  )
}

export default App
