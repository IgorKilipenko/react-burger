import React, { useCallback } from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { Burger } from "./burger"
import { BurgerIngredientType } from "../../data"
import { CartItemType, useCartContext } from "../../context/cart/cart-context"

const extractIngredientsByType = (ingredientsList: CartItemType<BurgerIngredientType>[]) => {
  const innerIngredients = ingredientsList.filter((item) => item.item.type !== "bun")
  const bun = ingredientsList.reduce<CartItemType<BurgerIngredientType> | null>((res, curr) => {
    return (res = curr.item.type === "bun" ? curr : res)
  }, null)
  return { bun, innerIngredients }
}

const BurgerConstructor = () => {
  const { cart: selectedIngredients } = useCartContext()
  const calcTotalPrice = useCallback(
    (ingredients: CartItemType<BurgerIngredientType>[]) =>
      ingredients.reduce((res, curr) => (res += curr.item.price * curr.quantity), 0),
    []
  )
  const { bun, innerIngredients } = extractIngredientsByType(selectedIngredients ?? [])
  const [totalPrice, setTotalPrice] = React.useState(0)

  React.useEffect(() => {
    setTotalPrice(calcTotalPrice(selectedIngredients ?? []))
  }, [calcTotalPrice, selectedIngredients])

  return (
    <Flex direction={"column"} gap={10} pt={100} justify="space-between" align="center" h="100%" w="100%">
      <Burger bun={bun} ingredients={innerIngredients} />
      <Flex justify="end" align="center" w="100%" gap={10}>
        <Flex align="center" gap={2}>
          <Text variant={"digitsMedium"}>{totalPrice}</Text>
          <Icon as={CurrencyIcon} boxSize={9} />
        </Flex>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-2">
          Оформить заказ
        </Button>
      </Flex>
    </Flex>
  )
}

export default BurgerConstructor
