import React, { useCallback } from "react"
import { Flex } from "@chakra-ui/react"
import { DbIndexType } from "../../data"
import { BurgerItem, ElementType, allowableTypes } from "./burger-item"
import { uid } from "uid"
import { useDrop } from "react-dnd"
import { useSelector } from "react-redux"
import type { BurgerCartItemType } from "../../services/slices/cart"
import { RootState } from "../../services/store"

export interface BurgerProps {}

export const Burger = React.memo<BurgerProps>(() => {
  const extractIngredientsByType = useCallback((ingredientsList: BurgerCartItemType[]) => {
    const innerIngredients = ingredientsList.filter((item) => item.item.type !== "bun")
    const bun = ingredientsList.reduce<BurgerCartItemType | null>((res, curr) => {
      return (res = curr.item.type === "bun" ? curr : res)
    }, null)
    return { bun, ingredients: innerIngredients }
  }, [])
  const handleDrop = React.useCallback((id: DbIndexType) => {
    console.log("drop")
  }, [])

  const selectedIngredients = useSelector((store: RootState) => store.cart.products)
  const { bun, ingredients } = extractIngredientsByType(selectedIngredients)

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      handleDrop(itemId as DbIndexType)
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  })

  return (
    <Flex
      ref={dropTarget}
      direction="column"
      justify="start"
      align="stretch"
      gap={4}
      overflowY="auto"
      overflowX="hidden"
      className="custom-scroll"
      pr={4}
    >
      {bun && <BurgerItem element={bun.item} type={allowableTypes.top as ElementType} />}
      {ingredients?.map((element) => (
        <BurgerItem key={`bi-${element.item._id}-${uid()}`} element={element.item} quantity={element.quantity} />
      ))}
      {bun && <BurgerItem element={bun.item} type={allowableTypes.bottom as ElementType} />}
    </Flex>
  )
})
