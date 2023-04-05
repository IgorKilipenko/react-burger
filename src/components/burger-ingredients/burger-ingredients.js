import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { IngredientCard } from "../common"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { data as rawData } from "../../utils/data"

const ingredientCategories = [
  { id: "bun", name: "булки" },
  { id: "sauce", name: "соусы" },
  { id: "main", name: "начинки" },
]

const IngredientsTabPanel = (props) => {
  const items = ingredientCategories
  const [current, setCurrent] = React.useState(items[0].id)

  return (
    <Flex {...props}>
      {items.map((item, i) => (
        <Tab key={`tab-${item.id}`} value={item.id} active={current === item.id} onClick={() => setCurrent(item.id)}>
          {capitalizeFirstLetter(item.name)}
        </Tab>
      ))}
    </Flex>
  )
}

const loadIngredients = () => {
  return rawData.reduce(
    (res, item) => {
      const category = (res[item.type] ??= [])
      category.push(item)
      return res
    },
    { bun: [] }
  )
}

const BurgerIngredients = () => {
  const data = loadIngredients()

  return (
    <Flex direction="column">
      <Text variant={"mainLarge"} pt={10} pb={5}>
        {capitalizeFirstLetter("соберите бургер")}
      </Text>
      <IngredientsTabPanel />
      <Flex direction="column" overflowY="auto" className="custom-scroll" mt={10} gap={10}>
        {ingredientCategories.map((category, i) => (
          <Flex key={`category-${category.id}-${i}`} direction="column">
            <Text variant={"mainMedium"}>{capitalizeFirstLetter(category.name)}</Text>
            <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={8} rowGap={6} pl={4} pr={4} pt={6}>
              {data[category.id].map((ingredient) => (
                <IngredientCard key={"ingredient-" + ingredient._id} ingredient={ingredient} />
              ))}
            </Grid>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default BurgerIngredients
