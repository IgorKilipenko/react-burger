import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients"
import BurgerConstructor from "../burger-constructor"
import theme from "../../theme/theme"
import { Flex } from "@chakra-ui/react"
import { BurgerProductsContext, ProductsContextProvider } from "../../context/products"
import { MainContainer } from "./main-container"

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
        <ProductsContextProvider context={BurgerProductsContext}>
          <MainContainer maxContentWidth={maxContentWidth} height={`calc(100% - ${headerHeight}px)`}>
            <BurgerIngredients grow={1} />
            <BurgerConstructor grow={1} />
          </MainContainer>
        </ProductsContextProvider>
      </Flex>
    </ChakraProvider>
  )
}

export default App
