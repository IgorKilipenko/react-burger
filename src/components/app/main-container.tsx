import React from "react"
import { Text } from "@chakra-ui/react"
import { Flex, type LayoutProps } from "@chakra-ui/react"
import { useFetchIngredients, useIsTouchEnabled } from "../../hooks"
import { ErrorMessage } from "../error-message"
import { useIngredientsContext } from "../../context/products"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"

interface MainContainerProps {
  children: React.ReactNode
  maxContentWidth?: LayoutProps["maxW"]
  height?: LayoutProps["height"]
  h?: LayoutProps["h"]
}

const loadingMessage = () => (
  <Flex align="center" justify="center">
    <Text variant="mainLarge">Загрузка...</Text>
  </Flex>
)

export const MainContainer = React.memo<MainContainerProps>(({ children, maxContentWidth, h, height = "100%" }) => {
  const { categories, setProducts } = useIngredientsContext()
  const currHeight = h ?? height
  const isTouchEnabled = useIsTouchEnabled()
  const { response, loading, error } = useFetchIngredients()

  React.useEffect(() => {
    setProducts(response.ingredients)
  }, [response.ingredients, setProducts])

  return (
    <Flex as="main" className="custom-scroll" overflow="auto" align="stretch" justify="stretch" h={currHeight}>
      <Flex grow={1} justify="space-around">
        {categories.length > 0 ? (
          <Flex
            maxW={maxContentWidth}
            justify="space-between"
            pl={5}
            pr={5}
            gap={10}
            pb={10}
            justifySelf="stretch"
            grow={1}
          >
            <DndProvider backend={!isTouchEnabled ? HTML5Backend : TouchBackend}>
              {React.Children.map(children, (child) => (
                <Flex as="section" grow={1} basis={0} justify="stretch">
                  {child}
                </Flex>
              ))}
            </DndProvider>
          </Flex>
        ) : error || (!loading && !response.success) ? (
          <ErrorMessage
            message={`Ошибка загрузки данных.${error || response.message ? " " : ""}${
              response.message ? response.message : error ?? ""
            }`}
          />
        ) : (
          loadingMessage()
        )}
      </Flex>
    </Flex>
  )
})
