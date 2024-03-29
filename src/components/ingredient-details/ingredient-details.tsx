import React from "react"
import { Flex, Image, Text } from "@chakra-ui/react"
import { useAppSelector } from "../../services/store"
import { getActiveIngredientFromModalStore } from "../../services/slices/active-modal-items"
import { appColors } from "../../theme/styles"
import { testsConfig } from "../../utils/test-utils"

export const INGREDIENT_DETAILS_TEST_ID = "ingredient_details"
export const INGREDIENT_DETAILS_HEADER_TEST_ID = "ingredient_details_name"

export interface IngredientDetailsProps {}

export const headerText = "Детали ингредиента"

export const IngredientDetails: React.FC<IngredientDetailsProps> = () => {
  const ingredient = useAppSelector(getActiveIngredientFromModalStore)
  const makeTextDetails = React.useCallback((name: string, value: string | number) => {
    return (
      <Flex direction="column" align="center" justify="center" gap={2} grow={1}>
        <Text variant="mainDefault" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {name}
        </Text>
        <Text variant="digitsDefault">{value}</Text>
      </Flex>
    )
  }, [])
  return (
    <Flex direction="column" align="center" pb={5} {...{[testsConfig.dataTestIdAttribute]:INGREDIENT_DETAILS_TEST_ID}}>
      {ingredient ? (
        <>
          <Image src={ingredient.image_large} h={240} ml={4} mr={4} mt={6} />
          <Text variant="mainMedium" mt={4} mb={8} {...{[testsConfig.dataTestIdAttribute]:INGREDIENT_DETAILS_HEADER_TEST_ID}}>
            {ingredient.name}
          </Text>
          <Flex gap={5} justify="center" color={appColors.inactive}>
            {makeTextDetails("Калории, ккал", ingredient.calories)}
            {makeTextDetails("Белки, г", ingredient.proteins)}
            {makeTextDetails("Жиры, г", ingredient.fat)}
            {makeTextDetails("Углеводы, г", ingredient.carbohydrates)}
          </Flex>
        </>
      ) : null}
    </Flex>
  )
}
