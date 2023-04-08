import React, { useCallback } from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { Burger } from "./burger"

const extractIngredientsByType = (ingredientsList) => {
  const innerIngredients = ingredientsList.filter((item) => item.type !== "bun").slice(0, 12)
  const bun = ingredientsList.reduce((res, curr) => {
    return (res = curr.type === "bun" ? curr : res)
  }, null)
  return [bun, innerIngredients]
}

const BurgerConstructor = ({ selectedIngredients }) => {
  const calcTotalPrice = useCallback((ingredients) => ingredients.reduce((res, curr) => (res += curr.price), 0), [])
  const [bun, innerIngredients] = extractIngredientsByType(selectedIngredients)
  const [totalPrice, setTotalPrice] = React.useState(0)

  React.useEffect(() => {
    setTotalPrice(calcTotalPrice(selectedIngredients))
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
