import { Flex, Text } from "@chakra-ui/react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { data as rawData } from "../../utils/data"
import { BurgerIngredientType } from "../types"
import { Burger } from "./burger"

const selectedIngredients = rawData

const extractIngredientsByType = (ingredientsList) => {
  const innerIngredients = ingredientsList.filter((item) => item.type !== "bun").slice(0, 12)
  const bun = ingredientsList.reduce((res, curr) => {
    return (res = curr.type === "bun" ? curr : res)
  }, null)
  return [bun, innerIngredients]
}

const BurgerConstructor = (/*{ selectedIngredients }*/) => {
  const [bun, innerIngredients] = extractIngredientsByType(selectedIngredients)
  return (
    <Flex direction={"column"} gap={10} pt={100} justify="space-between" align="center" h="100%" w="100%">
      <Burger bun={bun} ingredients={innerIngredients} />
      <Flex justify="end" align="center" w="100%" gap={10}>
        <Flex align="center" gap={2}>
          <Text variant={"digitsMedium"}>5785</Text>
          <Icon as={CurrencyIcon} boxSize={9} />
        </Flex>
        <Button htmlType="button" type="primary" size="large" extraClass="ml-2">
          Оформить заказ
        </Button>
      </Flex>
    </Flex>
  )
}

BurgerConstructor.propTypes = {
  selectedIngredients: BurgerIngredientType,
}

export default BurgerConstructor
