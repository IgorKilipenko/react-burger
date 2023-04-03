import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import theme from "../../theme/theme"
import { useTheme, Box } from "@chakra-ui/react"

const MainContainer = ({ children }) => {
  const {
    sizes: { container },
  } = useTheme()

  return (
    <Box position='absolute' width='100vw' height='100vh'>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { maxWidth: container.xl })
      )}
    </Box>
  )
}

function App() {
  const [headerHeight, setHeight] = React.useState(0);
  const handleHeaderChangeHeight = (value) => {
    setHeight(value)
  }
  return (
    <ChakraProvider theme={theme}>
      <MainContainer>
        <AppHeader onChangeHeight={(value) => handleHeaderChangeHeight(value)}/>
        <BurgerIngredients height={`calc(100% - ${headerHeight}px)`}/>
      </MainContainer>
    </ChakraProvider>
  )
}

export default App
