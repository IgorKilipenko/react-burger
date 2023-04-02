import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import theme from "../../theme/theme"
import { useTheme } from "@chakra-ui/react"

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const {
    sizes: { container },
  } = useTheme()

  return (
    <>
      {React.Children.map(children, (child: React.ReactNode) =>
        React.cloneElement(child as React.ReactElement, { maxWidth: container.xl })
      )}
    </>
  )
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainContainer>
        <AppHeader />
        <BurgerIngredients/>
      </MainContainer>
    </ChakraProvider>
  )
}

export default App
