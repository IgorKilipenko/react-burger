import React, { useCallback } from "react"
import { Flex, Box } from "@chakra-ui/react"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { DragIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { useCartContext, type CartItemType } from "../../context/cart/cart-context"
import { BurgerIngredientType } from "../../data"

export interface BurgerProps {
}

const allowableTypes = { top: "top", bottom: "bottom" }
export declare type ElementType = keyof typeof allowableTypes | undefined | null

export const Burger = React.memo<BurgerProps>(() => {
  const buildItem = ({
    element,
    type = null,
    quantity = 1,
  }: {
    element: BurgerIngredientType
    type?: ElementType
    quantity?: number
  }) => {
    const isBunElement = Object.values(allowableTypes).find((v) => v === type) ? true : false

    const bunProps = isBunElement
      ? {
          ...{
            position: "sticky",
            alignSelf: type === allowableTypes.top ? "flex-start" : "flex-end",
            top: type === allowableTypes.top ? 0 : null,
            bottom: type === allowableTypes.bottom ? 0 : null,
            pb: type === allowableTypes.top ? "1px" : null,
            pt: type === allowableTypes.bottom ? "1px" : null,
            bg: "body-bg",
          },
        }
      : {}

    return (
      <Flex key={`bc-${element._id ?? element.name}` + (type ? `-${type}` : "")} w="100%" {...bunProps}>
        <Flex w={8} align="center">
          <Box w={6}>{!isBunElement && <Icon as={DragIcon} />}</Box>
        </Flex>
        <ConstructorElement
          type={type ?? undefined}
          isLocked={isBunElement || false}
          text={element.name + (isBunElement ? ` (${type === allowableTypes.top ? "верх" : "низ"})` : "")}
          price={element.price * quantity}
          thumbnail={element.image}
        />
      </Flex>
    )
  }

  const extractIngredientsByType = useCallback((ingredientsList: CartItemType<BurgerIngredientType>[]) => {
    const innerIngredients = ingredientsList.filter((item) => item.item.type !== "bun")
    const bun = ingredientsList.reduce<CartItemType<BurgerIngredientType> | null>((res, curr) => {
      return (res = curr.item.type === "bun" ? curr : res)
    }, null)
    return { bun, ingredients:innerIngredients }
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
      {bun && buildItem({ element: bun.item, type: allowableTypes.top as ElementType })}
      {ingredients?.map((element) => buildItem({ element: element.item, quantity: element.quantity }))}
      {bun && buildItem({ element: bun.item, type: allowableTypes.bottom as ElementType })}
    </Flex>
  )
})
