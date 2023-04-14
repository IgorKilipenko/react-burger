import React, { useCallback } from "react"
import { Flex } from "@chakra-ui/react"
import { useCartContext, type CartItemType } from "../../context/cart/cart-context"
import { BurgerIngredientType } from "../../data"
import { burgerItemBuilder, ElementType, allowableTypes } from "./burger-item-builder"

export interface BurgerProps {}

export const Burger = React.memo<BurgerProps>(() => {
  const extractIngredientsByType = useCallback((ingredientsList: CartItemType<BurgerIngredientType>[]) => {
    const innerIngredients = ingredientsList.filter((item) => item.item.type !== "bun")
    const bun = ingredientsList.reduce<CartItemType<BurgerIngredientType> | null>((res, curr) => {
      return (res = curr.item.type === "bun" ? curr : res)
    }, null)
    return { bun, ingredients: innerIngredients }
  }, [])

  const { cart: selectedIngredients } = useCartContext()
  const { bun, ingredients } = extractIngredientsByType(selectedIngredients)

  return (
    <Flex
      direction="column"
      justify="start"
      align="center"
      gap={4}
      maxH="100%"
      overflowY="auto"
      overflowX="hidden"
      className="custom-scroll"
      pr={4}
    >
      {bun && burgerItemBuilder({ element: bun.item, type: allowableTypes.top as ElementType })}
      {ingredients?.map((element) => burgerItemBuilder({ element: element.item, quantity: element.quantity }))}
      {bun && burgerItemBuilder({ element: bun.item, type: allowableTypes.bottom as ElementType })}
    </Flex>
  )
})
