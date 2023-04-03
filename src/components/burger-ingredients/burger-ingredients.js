import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex, Center, Box, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
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

const BurgerIngredients = ({ maxWidth = null }) => {
  const Space = ({ value }) => <Box width={value} />
  const data = loadIngredients()
  console.log(data)
  console.log(rawData)
  return (
    <Center width="100%">
      <Flex as="main" maxWidth={maxWidth ?? "100%"} justify="space-between" width="100%" pl={5} pr={5}>
        <Flex as="section" direction="column" grow={1} basis={0} width="100%" pt={10}>
          <Text variant={"mainLarge"} pt={5} pb={10}>
            {capitalizeFirstLetter("соберите бургер")}
          </Text>
          <IngredientsTabPanel />
          <Flex direction="column">
            {ingredientCategories.map((category, i) => (
              <Flex key={`category-${category.id}-${i}`} direction="column" pt={10}>
                <Text variant={"mainMedium"}>{capitalizeFirstLetter(category.name)}</Text>
                <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={8} rowGap={6} pl={4} pr={4} pt={6}>
                  {data[category.id].map((ingredient, i) => (
                    <Flex key={ingredient._id} direction='column' /*bg="gray.700"*/ w="100%" h="208px">
                      <Image src={ingredient.image}/>
                      <Text variant={"mainDefault"} align='center'>{ingredient.name}</Text>
                    </Flex>
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
