import React, { useCallback } from "react"
import { Flex } from "@chakra-ui/react"
import { allowableCategories, BurgerIngredientType } from "../../data"
import { BurgerItem, ElementType, allowableTypes } from "./burger-item"
import { uid } from "uid"
import { useDrop } from "react-dnd"
import { useSelector, useDispatch } from "react-redux"
import { burgerActions } from "../../services/slices/burger-constructor"
import type { BurgerItemType } from "../../services/slices/burger-constructor"
import { RootState } from "../../services/store"

export interface BurgerProps {}

export const Burger = React.memo<BurgerProps>(() => {
  const extractIngredientsByType = useCallback((ingredientsList: BurgerItemType[]) => {
    const innerIngredients = ingredientsList.filter((item) => item.product.type !== allowableCategories.bun)
    const bun = ingredientsList.reduce<BurgerItemType | null>((res, curr) => {
      return (res = curr.product.type === allowableCategories.bun ? curr : res)
    }, null)
    return { bun, ingredients: innerIngredients }
  }, [])

  const dispatch = useDispatch()
  const { addProductToCart } = burgerActions
  const selectedIngredients = useSelector((store: RootState) => store.burgerConstructor.products)
  const { bun, ingredients } = extractIngredientsByType(selectedIngredients)

  const handleDrop = React.useCallback(
    (ingredient: BurgerIngredientType) => {
      dispatch(addProductToCart({ product: ingredient, uid: uid() }))
    },
    [addProductToCart, dispatch]
  )

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: { ingredient: BurgerIngredientType }) {
      handleDrop(item.ingredient)
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
      {...(isHover ? { boxShadow: `0 0 0px 2px var(--chakra-colors-active-border-color)` } : {})}
    >
      {bun && (
        <BurgerItem
          element={bun.product}
          type={allowableTypes.top as ElementType}
          uid={`${bun.uid ?? uid()}-${allowableTypes.top}`}
        />
      )}
      {ingredients?.map((element, i) => (
        <BurgerItem
          key={`bi-${element.uid ?? uid()}`}
          sortIndex={i}
          element={element.product}
          uid={element.uid ?? uid()}
        />
      ))}
      {bun && (
        <BurgerItem
          element={bun.product}
          type={allowableTypes.bottom as ElementType}
          uid={`${bun.uid ?? uid()}-${allowableTypes.bottom}`}
        />
      )}
    </Flex>
  )
})
