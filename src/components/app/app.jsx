import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients"
import BurgerConstructor from "../burger-constructor"
import theme from "../../theme/theme"
import { Box, Flex } from "@chakra-ui/react"

const MainContainer = ({ children, maxContentWidth = null, height = "100%" }) => {
  return (
    <Flex as="main" align="start" justify="center" h={height}>
      <Flex w="100%" h="100%" maxW={maxContentWidth ?? "100%"} justify="space-between" pl={5} pr={5} gap={5} pb={2}>
        {React.Children.map(children, (child) => (
          <Flex as="section" grow={1} basis={0} justify='center'>
            {child}
          </Flex>
        ))}
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
      <Box position="absolute" width="100vw" height="100vh" overflowY="hidden">
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
