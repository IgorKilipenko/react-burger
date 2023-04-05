import { Flex, Text, Box, Icon } from "@chakra-ui/react"
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { data as rawData } from "../../utils/data"
import { BurgerIngredientType } from "../types"

const selectedIngredients = rawData

const extractIngredientsByType = (ingredientsList) => {
  const innerIngredients = ingredientsList.filter((item) => item.type !== "bun").slice(0, 12)
  const bun = ingredientsList.reduce((res, curr) => {
    return (res = curr.type === "bun" ? curr : res)
  }, null)
  return [bun, innerIngredients]
}

const Burger = ({ bun, ingredients }) => {
  const allowableTypes = { top: "top", bottom: "bottom" }
  const buildItem = ({ element, type = null }) => {
    const isBunElement = Object.values(allowableTypes).find((v) => v === type) ? true : false

    const bunProps = isBunElement
      ? {
          position: "sticky",
          alignSelf: type === allowableTypes.top ? "flex-start" : "flex-end",
          top: type === allowableTypes.top ? 0 : null,
          bottom: type === allowableTypes.bottom ? 0 : null,
          pb: type === allowableTypes.top ? "1px" : null,
          pt: type === allowableTypes.bottom ? "1px" : null,
          bg: "body-bg",
        }
      : null

    return (
      <Flex key={`bc-${element._id ?? element.name}` + (type ? `-${type}` : "")} w="100%" {...bunProps}>
        <Flex w={8} align="center">
          <Box w={6}>{!isBunElement && <DragIcon type="primary" />}</Box>
        </Flex>
        <ConstructorElement
          type={type}
          isLocked={element.isLocked || isBunElement || false}
          text={element.name + (isBunElement ? ` (${type === allowableTypes.top ? "верх" : "низ"})` : "")}
          price={element.price}
          thumbnail={element.image}
        />
      </Flex>
    )
  }

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
      {bun && buildItem({ element: bun, type: allowableTypes.top })}
      {ingredients.map((element) => buildItem({ element }))}
      {bun && buildItem({ element: bun, type: allowableTypes.bottom })}
    </Flex>
  )
}

const BurgerConstructor = (/*{ selectedIngredients }*/) => {
  const [bun, innerIngredients] = extractIngredientsByType(selectedIngredients)
  return (
    <Flex direction={"column"} gap={10} pt={100} justify="space-between" align="center" h="100%" w="100%">
      <Burger bun={bun} ingredients={innerIngredients} />
      <Flex justify="end" align="center" w="100%" gap={10}>
        <Flex align="center">
          <Text variant={"digitsMedium"}>
            5785
          </Text>
          <Icon as={CurrencyIcon} />
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
