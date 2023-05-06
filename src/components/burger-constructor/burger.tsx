import React from "react"
import { Flex } from "@chakra-ui/react"
import { BurgerIngredientType } from "../../data"
import { BurgerItem, ElementType, allowableTypes } from "./burger-item"
import { useDrop } from "react-dnd"
import { useSelector, useDispatch } from "react-redux"
import { burgerActions } from "../../services/slices/burger-constructor"
import { RootState } from "../../services/store"

export interface BurgerProps {}

export const Burger = React.memo<BurgerProps>(() => {
  const dispatch = useDispatch()
  const { addProductToCart } = burgerActions
  const {bun, products:ingredients} = useSelector((store: RootState) => store.burgerConstructor)

  const handleDrop = React.useCallback(
    (ingredient: BurgerIngredientType) => {
      dispatch(addProductToCart({ product: ingredient }))
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
          uid={`${bun.uid}-${allowableTypes.top}`}
        />
      )}
      {ingredients?.map((element, i) => (
        <BurgerItem
          key={`bi-${element.uid}`}
          sortIndex={i}
          element={element.product}
          uid={element.uid}
        />
      ))}
      {bun && (
        <BurgerItem
          element={bun.product}
          type={allowableTypes.bottom as ElementType}
          uid={`${bun.uid}-${allowableTypes.bottom}`}
        />
      )}
    </Flex>
  )
})
