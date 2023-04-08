import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients"
import BurgerConstructor from "../burger-constructor"
import theme from "../../theme/theme"
import { Box, Flex, LayoutProps } from "@chakra-ui/react"
import { useFetch } from "../../hooks"
import { apiClientConfig } from "../../data"

/*interface MainContainerProps extends FlexProps {
  maxContentWidth: FlexProps["maxW"] | null
}*/

interface MainContainerProps {
  children: React.ReactNode
  maxContentWidth?: LayoutProps["maxW"]
  height?: LayoutProps["height"]
  h?: LayoutProps["h"]
}

const MainContainer: React.FC<MainContainerProps> = ({ children, maxContentWidth, h, height = "100%" }) => {
  const currHeight = h ?? height
  return (
    <Flex as="main" className="custom-scroll" overflow="auto" align="stretch" justify="stretch" h={currHeight}>
      <Flex minW="min-content">
        <Flex maxW={maxContentWidth} justify="space-between" pl={5} pr={5} gap={10} pb={10}>
          {React.Children.map(children, (child) => (
            <Flex as="section" grow={1} basis={0} justify="center">
              {child}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

const App: React.FC = () => {
  const [headerHeight, setHeight] = React.useState(0)
  const handleHeaderChangeHeight = (value: number) => {
    setHeight(value)
  }
  const maxContentWidth = theme.sizes.container.maxContentWidth

  const { data: ingredientsRawData, error: fetchError } = useFetch(
    `${apiClientConfig.baseUrl}/${apiClientConfig.ingredientsPath}`
  )

  return (
    <ChakraProvider theme={theme}>
      <Box position="absolute" width="100vw" height="100vh" overflow="hidden">
        <AppHeader onChangeHeight={handleHeaderChangeHeight} />
        <MainContainer maxContentWidth={maxContentWidth} height={`calc(100% - ${headerHeight}px)`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </MainContainer>
      </Box>
    </ChakraProvider>
  )
}

export default App
