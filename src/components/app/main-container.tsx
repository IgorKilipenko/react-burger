import React from "react"
import { Text } from "@chakra-ui/react"
import { Flex, type LayoutProps } from "@chakra-ui/react"
import { useFetchIngredients, useIsTouchEnabled } from "../../hooks"
import { ErrorMessage } from "../error-message"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { TouchBackend } from "react-dnd-touch-backend"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { getAllIngredients } from "../../services/slices/products/products-slice"

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
  const currHeight = h ?? height
  const isTouchEnabled = useIsTouchEnabled()
  const { categories, loading, error } = useAppSelector((store) => store.products)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(getAllIngredients())
  }, [dispatch])

  return (
    <Flex as="main" className="custom-scroll" overflow="auto" align="stretch" justify="stretch" h={currHeight}>
      <Flex grow={1} justify="space-around">
        {error ? (
          <ErrorMessage message={`Ошибка загрузки данных. ${error.message}`} />
        ) : loading || !categories || categories.length === 0 ? (
          loadingMessage()
        ) : (
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
        )}
      </Flex>
    </Flex>
  )
})
