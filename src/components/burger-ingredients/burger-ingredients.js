import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex, Center, Box, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

const IngredientsTabPanel = (props) => {
  const items = ["булки", "соусы", "начинки"]
  const [current, setCurrent] = React.useState(items[0])

  return (
    <Flex {...props}>
      {items.map((item, i) => (
        <Tab key={`${item}-${i}`} value={item} active={current === item} onClick={() => setCurrent(item)}>
          {item}
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
        <Flex flexDirection="column" flexGrow={1} flexBasis={0} width="100%" pt={10}>
          <Text
            fontWeight="bold"
            fontFamily="Jet Brains Mono"
            fontSize="36px"
            className="text text_type_main-large"
            pt={5}
            pb={10}
          >
            Соберите бургер
          </Text>
          <IngredientsTabPanel />
          {/*<Flex wrap='wrap' justify='space-between' pl={4} pr={4}>
            {Array(10)
              .fill(0)
              .map((x,i) => (
                <Center key={i} w="272px" h="208px" grow={1} basic={0} p={2}>
                  <Center  bg="gray.700" w='100%' h='100%'>Ingredient</Center>
                </Center>
              ))}
          </Flex>
              */}
          <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={8} rowGap={6} pl={4} pr={4} pt={6}>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <Center key={i} bg="gray.700" w='100%' h="208px">
                  Ingredient
                </Center>
              ))}
          </Grid>
        </Flex>
        <Space value={5} />
        <Center flexGrow={1} flexBasis={0} width="100%" pt={100}>
          Data
        </Center>
      </Flex>
    </Center>
  )
}

export default BurgerIngredients
