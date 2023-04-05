import PropTypes from "prop-types"
import { Flex, Image, Text } from "@chakra-ui/react"
import { BurgerIngredientType } from "../../types"

const IngredientCard = ({ ingredient, size }) => {
  return (
    <Flex direction="column" h={size?.h} w={size?.w}>
      <Image src={ingredient.image} />
      <Text variant={"mainDefault"} align="center">
        {ingredient.name}
      </Text>
    </Flex>
  )
}

IngredientCard.propTypes = {
  ingredient: BurgerIngredientType.isRequired,
  size: PropTypes.shape({
    w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
}

export { IngredientCard }
