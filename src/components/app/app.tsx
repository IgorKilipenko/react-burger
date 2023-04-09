import { ChakraProvider, Text } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients"
import BurgerConstructor from "../burger-constructor"
import theme from "../../theme/theme"
import { Flex, type LayoutProps } from "@chakra-ui/react"
import { useFetch } from "../../hooks"
import { apiClientConfig, parseRawData, type BurgerIngredientType } from "../../data"
import { ErrorMessage } from "../error-message"
import { CartContextProvider, BurgerCartContext } from "../../context/cart"

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
      <Flex grow={1} justify="space-around">
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

const loadingMessage = () => (
  <Flex align="center" justify="center">
    <Text variant="mainLarge">Загрузка...</Text>
  </Flex>
)

const App = () => {
  const [headerHeight, setHeight] = React.useState(0)
  const maxContentWidth = theme.sizes.container.maxContentWidth
  const { data, error } = useFetch<{ data: BurgerIngredientType[]; success: boolean } | undefined>(
    `${apiClientConfig.baseUrl}/${apiClientConfig.ingredientsPath}`
  )

  const { table: ingredients, categories } = React.useMemo(() => {
    return parseRawData(data?.data ?? [])
  }, [data])

  const handleHeaderChangeHeight = (value: number) => {
    setHeight(value)
  }

  return (
    <ChakraProvider theme={theme}>
      <CartContextProvider context={BurgerCartContext}>
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
            {categories.length > 0 ? (
              [
                <BurgerIngredients
                  key={`section-BurgerIngredients`}
                  categories={categories}
                  activeCategoryId={categories[0]?.id ?? 0}
                  ingredients={ingredients}
                />,
                <BurgerConstructor key={`section-BurgerConstructor`} />,
              ]
            ) : error || (data && !data.success) ? (
              <ErrorMessage message="Ошибка загрузки данных." />
            ) : (
              loadingMessage()
            )}
          </MainContainer>
        </Flex>
      </CartContextProvider>
    </ChakraProvider>
  )
}

export default App
