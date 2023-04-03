import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients"
import BurgerConstructor from "../burger-constructor"
import theme from "../../theme/theme"
import { Box, Flex } from "@chakra-ui/react"

const MainContainer = ({ children, maxContentWidth = null, height = "100%" }) => {
  return (
    <Flex align="start" justify="center" h={height} >
      <Flex as="main" w="100%" h="100%" maxW={maxContentWidth ?? "100%"} justify="center" pl={5} pr={5} gap={5}>
        {children}
      </Flex>
    </Flex>
  )
}

function App() {
  const [headerHeight, setHeight] = React.useState(0)
  const handleHeaderChangeHeight = (value) => {
    setHeight(value)
  }
  const maxContentWidth = theme.sizes.container.maxContentWidth
  return (
    <ChakraProvider theme={theme}>
      <Box position="absolute" width="100vw" height="100vh">
        <AppHeader maxContentWidth={maxContentWidth} onChangeHeight={(value) => handleHeaderChangeHeight(value)} />
        <MainContainer maxContentWidth={maxContentWidth} height={`calc(100% - ${headerHeight}px)`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </MainContainer>
      </Box>
    </ChakraProvider>
  )
}

export default App
