import { ChakraProvider, Text } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients"
import BurgerConstructor from "../burger-constructor"
import theme from "../../theme/theme"
import { Box, Flex, LayoutProps } from "@chakra-ui/react"
import { useFetch } from "../../hooks"
import { apiClientConfig, getAllCategoriesFromData, type BurgerIngredientType } from "../../data"

interface MainContainerProps {
  children: React.ReactNode
  maxContentWidth?: LayoutProps["maxW"]
  height?: LayoutProps["height"]
  h?: LayoutProps["h"]
  messageComponent?: React.ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  maxContentWidth,
  h,
  height = "100%",
  messageComponent,
}) => {
  const currHeight = h ?? height
  return (
    <Flex as="main" className="custom-scroll" overflow="auto" align="stretch" justify="stretch" h={currHeight}>
      <Flex minW="min-content" grow={1}>
        <Flex maxW={maxContentWidth} justify="space-between" pl={5} pr={5} gap={10} pb={10}>
          {messageComponent
            ? messageComponent
            : React.Children.map(children, (child) => (
                <Flex as="section" grow={1} basis={0} justify="center">
                  {child}
                </Flex>
              ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

const errorMessage = (message: string) => (
  <Flex align="center" justify="center">
    <Text variant="mainLarge">{message}</Text>
  </Flex>
)

const loadingMessage = () => (
  <Flex align="center" justify="center">
    <Text variant="mainLarge">Загрузка...</Text>
  </Flex>
)

const App = () => {
  const [headerHeight, setHeight] = React.useState(0)
  const handleHeaderChangeHeight = (value: number) => {
    setHeight(value)
  }
  const maxContentWidth = theme.sizes.container.maxContentWidth

  const { data, error } = useFetch<{ data: BurgerIngredientType[]; success: boolean } | undefined>(
    `${apiClientConfig.baseUrl}/${apiClientConfig.ingredientsPath}`
  )

  if (error) {
    console.log(error)
  }

  const categories = React.useMemo(() => {
    const result = error || !data?.success ? [] : getAllCategoriesFromData(data.data)
    console.log({ result, data: data })
    return result
  }, [data, error])

  return (
    <ChakraProvider theme={theme}>
      <Flex width="100vw" height="100vh" direction="column" align="stretch" justify='stretch' overflow="hidden">
        <AppHeader onChangeHeight={handleHeaderChangeHeight} />
        <MainContainer
          maxContentWidth={maxContentWidth}
          height={`calc(100% - ${headerHeight}px)`}
          messageComponent={
            error || (data && !data.success)
              ? errorMessage("Ошибка загрузки данных.")
              : categories.length === 0 && loadingMessage()
          }
        >
          <BurgerIngredients categories={categories} activeCategoryId={categories[0]} />
          <BurgerConstructor />
        </MainContainer>
      </Flex>
    </ChakraProvider>
  )
}

export default App
