import React from "react"
import PropTypes from "prop-types"
import { Flex, Text } from "@chakra-ui/react"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { data as rawData } from "../../utils/data"

const selectedIngredients = rawData

const extractIngredientsByType = (ingredientsList) => {
  const innerIngredients = ingredientsList.filter((item) => item.type !== "bun").slice(0, 12)
  const bun = ingredientsList.reduce((res, curr) => {
    return (res = curr.type === "bun" ? curr : res)
  }, null)
  return [bun, innerIngredients]
}

const Burger = ({ bun, ingredients }) => {
  const buildItem = ({ element, type = null }) => {
    const stickyProps = {
      position: "sticky",
      alignSelf: type === "top" ? "flex-start" : "flex-end",
      top: type === "top" ? 0 : null,
      bottom: type === "bottom" ? 0 : null,
      pb: type === "top" ? "1px" : null,
      pt: type === "bottom" ? "1px" : null,
    }
    const result = (
      <Flex w="100%" pr={4} grow={1} basis={0}>
        <ConstructorElement
          key={`burger-constructor-${element._id ?? element.name}` + (type ? `-${type}` : "")}
          type={type}
          isLocked={element.isLocked ?? false}
          text={element.name}
          price={element.price}
          thumbnail={element.image}
        />
      </Flex>
    )
    return type ? React.cloneElement(result, { bg: "body-bg", ...stickyProps }) : result
  }

  return (
    <Flex
      direction="column"
      justify="start"
      align="center"
      gap={2}
      maxH="100%"
      overflowY="auto"
      overflowX="hidden"
      className="custom-scroll"
    >
      {bun && buildItem({ element: bun, type: "top" })}
      {ingredients.map((element) => buildItem({ element }))}
      {bun && buildItem({ element: bun, type: "bottom" })}
    </Flex>
  )
}

const BurgerConstructor = (/*{ selectedIngredients }*/) => {
  const [bun, innerIngredients] = extractIngredientsByType(selectedIngredients)
  return (
    <Flex direction={"column"} pt={100} justify="space-between" align="center" h="100%">
      <Burger bun={bun} ingredients={innerIngredients} />
      <Text maxH="min-content">Оформить заказ</Text>
    </Flex>
  )
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["main", "bun", "sauce"]).isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number,
      isLocked: PropTypes.bool,
    })
  ),
}

export default BurgerConstructor
