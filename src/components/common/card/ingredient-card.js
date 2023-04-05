import PropTypes from "prop-types"
import { Flex, Image, Text, Icon } from "@chakra-ui/react"
import { BurgerIngredientType } from "../../types"
import { Link } from "../link"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

const IngredientCard = ({ ingredient, size }) => {
  return (
    <Link isActive={true}>
      <Flex direction="column" align="center" h={size?.h} w={size?.w} _hover={{ bg: "app-header-bg" }}>
        <Image src={ingredient.image} pl={4} pr={4} pt={6} />
        <Flex gap={2} pt={1} pb={1}>
          <Text variant={"digitsDefault"} align="center">
            5785
          </Text>
          <Icon as={CurrencyIcon} />
        </Flex>
        <Text variant={"mainDefault"} align="center" h={12}>
          {ingredient.name}
        </Text>
      </Flex>
    </Link>
  )
}

IngredientCard.propTypes = {
  ingredient: BurgerIngredientType.isRequired,
  size: PropTypes.shape({
    w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
}

export { IngredientCard }
