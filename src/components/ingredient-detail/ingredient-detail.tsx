import { Flex, Image, Text } from "@chakra-ui/react"
import { BurgerIngredientType } from "../../data"

export interface IngredientDetailProps {
  ingredient: BurgerIngredientType
}

export const headerText = "Детали ингредиента"

export const IngredientDetail = ({ ingredient }: IngredientDetailProps) => {
  const makeTextDetails = (name: string, value: string | number) => {
    return (
      <Flex direction="column" align="center" justify="center" gap={2} grow={1}>
        <Text variant="mainDefault" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {name}
        </Text>
        <Text variant="digitsDefault">{value}</Text>
      </Flex>
    )
  }
  return (
    <Flex>
      <Flex direction="column" align="center">
        <Image src={ingredient.image_large} h={240} ml={4} mr={4} mt={6} />
        <Text variant="mainMedium" mt={4} mb={8}>
          {ingredient.name}
        </Text>
        <Flex gap={5} justify="center" color={"link-inactive-color"}>
          {makeTextDetails("Калории, ккал", ingredient.calories)}
          {makeTextDetails("Белки, г", ingredient.proteins)}
          {makeTextDetails("Жиры, г", ingredient.fat)}
          {makeTextDetails("Углеводы, г", ingredient.carbohydrates)}
        </Flex>
      </Flex>
    </Flex>
  )
}
