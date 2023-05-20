import React from "react"
import { Flex, type LayoutProps } from "@chakra-ui/react"
import { ErrorMessage } from "../error-message"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { getProductsStore, getAllIngredients } from "../../services/slices/products"
import { LoadingProgress } from "../common/loading-progress"

interface MainContainerProps {
  children: React.ReactNode
  maxContentWidth?: LayoutProps["maxW"]
  height?: LayoutProps["height"]
  h?: LayoutProps["h"]
}

export const MainContainer = React.memo<MainContainerProps>(({ children, maxContentWidth, h, height = "100%" }) => {
  const lockRef = React.useRef(false) /// Needed in strict mode for ignore synthetic/fast rerender
  const currHeight = h ?? height
  const { categories, loading, error } = useAppSelector(getProductsStore)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (lockRef.current === false) {
      lockRef.current = true

      dispatch(getAllIngredients())
    }
  }, [dispatch])

  return (
    <Flex as="main" className="custom-scroll" overflow="auto" align="stretch" justify="stretch" h={currHeight}>
      <Flex grow={1} justify="space-around">
        {error ? (
          <ErrorMessage message={`Ошибка загрузки данных. ${error.message}`} />
        ) : loading || !categories || categories.length === 0 ? (
          <LoadingProgress />
        ) : (
          <Flex maxW={maxContentWidth} justify="stretch" pl={5} pr={5} pb={10} justifySelf="stretch" grow={1}>
            {children}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
})
