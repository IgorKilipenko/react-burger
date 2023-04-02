import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex, Center, Box, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"

const ingredientCategories = ["булки", "соусы", "начинки"]

const IngredientsTabPanel = (props) => {
  const items = ingredientCategories
  const [current, setCurrent] = React.useState(items[0])

  return (
    <Flex {...props}>
      {items.map((item, i) => (
        <Tab key={`tab-${item}-${i}`} value={item} active={current === item} onClick={() => setCurrent(item)}>
          {capitalizeFirstLetter(item)}
        </Tab>
      ))}
    </Flex>
  )
}

const BurgerIngredients = ({ maxWidth = null }) => {
  const Space = ({ value }) => <Box width={value} />
  return (
    <Center width="100%">
      <Flex as="main" maxWidth={maxWidth ?? "100%"} justify="space-between" width="100%" pl={5} pr={5}>
        <Flex as="section" direction="column" grow={1} basis={0} width="100%" pt={10}>
          <Text variant={"mainLarge"} pt={5} pb={10}>
            {capitalizeFirstLetter("соберите бургер")}
          </Text>
          <IngredientsTabPanel pb={10} />
          <Flex direction="column">
            {ingredientCategories.map((category, i) => (
              <Flex key={`category-${category}-${i}`} direction="column">
                <Text variant={"mainMedium"}>{capitalizeFirstLetter(category)}</Text>
                <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={8} rowGap={6} pl={4} pr={4} pt={6}>
                  {Array(Math.floor(Math.random() * 5 + 1))
                    .fill(0)
                    .map((_, i) => (
                      <Center key={`ingredient-${i}`} bg="gray.700" w="100%" h="208px">
                        <Text variant={"mainDefault"}>Ingredient</Text>
                      </Center>
                    ))}
                </Grid>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Space value={5} />
        <Center grow={1} basis={0} width="100%" pt={100}>
          <Text variant={"mainLarge"}>Data</Text>
        </Center>
      </Flex>
    </Center>
  )
}

export default BurgerIngredients
