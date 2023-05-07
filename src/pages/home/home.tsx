import React from "react"
import { Flex } from "@chakra-ui/react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import BurgerConstructor from "../../components/burger-constructor"
import BurgerIngredients from "../../components/burger-ingredients"
import { useIsTouchEnabled } from "../../hooks"

export const HomePage = React.memo(() => {
  const isTouchEnabled = useIsTouchEnabled()

  return (
    <Flex justify="space-between" gap={10} grow={1}>
      <DndProvider backend={!isTouchEnabled ? HTML5Backend : TouchBackend}>
        <BurgerIngredients grow={1} basis={0} />
        <BurgerConstructor grow={1} basis={0} />
      </DndProvider>
    </Flex>
  )
})
