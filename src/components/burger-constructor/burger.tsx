import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { BurgerIngredientType } from "../../data"
import { BurgerItem, ElementType, EmptyBunItem, allowableTypes } from "./burger-item"
import { useDrop } from "react-dnd"
import { burgerActions, getBurgerStore } from "../../services/slices/burger-constructor"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { appColors } from "../../theme/styles"

export interface BurgerProps {}

export const Burger = React.memo<BurgerProps>(() => {
  const dispatch = useAppDispatch()
  const { addProductToCart } = burgerActions
  const { bun, products: ingredients } = useAppSelector(getBurgerStore)

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
      {bun ? (
        <BurgerItem
          element={bun.product}
          type={allowableTypes.top as ElementType}
          uid={`${bun.uid}-${allowableTypes.top}`}
        />
      ) : (
        <EmptyBunItem type={"top"} />
      )}
      {bun ||  ingredients.length > 0 ? (
        ingredients?.map((element, i) => (
          <BurgerItem key={`bi-${element.uid}`} sortIndex={i} element={element.product} uid={element.uid} />
        ))
      ) : (
        <Flex justify={"center"}>
          <Text mt={6} mb={6} textAlign={"center"} maxW={"80%"} variant={"mainDefault"} color={appColors.inactive}>
            Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
          </Text>
        </Flex>
      )}
      {bun ? (
        <BurgerItem
          element={bun.product}
          type={allowableTypes.bottom as ElementType}
          uid={`${bun.uid}-${allowableTypes.bottom}`}
        />
      ) : (
        <EmptyBunItem type={"bottom"} />
      )}
    </Flex>
  )
})
