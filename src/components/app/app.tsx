import { ChakraProvider, Text } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import BurgerIngredients from "../burger-ingredients"
import BurgerConstructor from "../burger-constructor"
import theme from "../../theme/theme"
import { Flex, type LayoutProps } from "@chakra-ui/react"
import { useFetch } from "../../hooks"
import { apiClientConfig, parseRawData, type BurgerIngredientType, type IngredientsTableView } from "../../data"
import { ErrorMessage } from "../error-message"

const selectIngredients = (ingredients: IngredientsTableView, bunId: string = "bun") => {
  const randomIndex = (val: any[] | number) => Math.floor(Math.random() * (Array.isArray(val) ? val!.length : val))

  const bun = { ingredient: ingredients[bunId][randomIndex(ingredients[bunId])], count: 1 }
  const innerIngredients = Object.keys(ingredients)
    .filter((key) => key !== bunId)
    .reduce<{ ingredient: BurgerIngredientType; count: number }[]>((res, key) => {
      res.push(
        ...ingredients[key]
          .slice(Math.floor(randomIndex(ingredients[key])))
          .map((ingredient) => ({ ingredient, count: 1 }))
      )
      return res
    }, [])
  return [bun, ...innerIngredients]
}

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

  const selectedIngredients = React.useMemo(() => {
    return categories.length > 0 ? selectIngredients(ingredients) : []
  }, [categories.length, ingredients])

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
          {categories.length > 0 ? (
            [
              <BurgerIngredients
                key={`section-BurgerIngredients`}
                categories={categories}
                activeCategoryId={categories[0]?.id ?? 0}
                ingredients={ingredients}
              />,
              <BurgerConstructor key={`section-BurgerConstructor`} selectedIngredients={selectedIngredients} />,
            ]
          ) : error || (data && !data.success) ? (
            <ErrorMessage message="Ошибка загрузки данных." />
          ) : (
            loadingMessage()
          )}
        </MainContainer>
      </Flex>
    </ChakraProvider>
  )
}

export default App
