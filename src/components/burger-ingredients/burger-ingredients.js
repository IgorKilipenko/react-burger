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

const IngredientsTabPanel = ({ items, onChangeActiveTab }) => {
  const [current, setCurrent] = React.useState(items[0].id)

  React.useEffect(() => {
    onChangeActiveTab && onChangeActiveTab(current)
  }, [current, onChangeActiveTab])

  return (
    <Flex>
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

const BurgerIngredients = ({ categories = ingredientCategories, activeCategoryId = 2 }) => {
  const data = loadIngredients()
  const categoriesRefs = React.useRef(Array(categories))
  const [currentTabId, setCurrentTabId] = React.useState(activeCategoryId)

  React.useEffect(() => {
    categoriesRefs.current = categoriesRefs.current.slice(0, categories.length)
  }, [categories])

  const scrollIntoCategory = (id) => {
    id = Math.min(categoriesRefs.current.length - 1, id)
    if (id < 0) return
    categoriesRefs.current[id].scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollIntoCategory(currentTabId)
  }, [currentTabId])

  const handleChangeActiveTab = (tabId) => {
    setCurrentTabId(categories.findIndex((c) => c.id === tabId))
  }

  return (
    <Flex direction="column">
      <Text variant={"mainLarge"} pt={10} pb={5}>
        {capitalizeFirstLetter("соберите бургер")}
      </Text>
      <IngredientsTabPanel items={ingredientCategories} onChangeActiveTab={handleChangeActiveTab} />
      <Flex direction="column" overflowY="auto" className="custom-scroll" mt={10} gap={10}>
        {categories.map((category, i) => (
          <Flex key={`category-${category.id}-${i}`} ref={(el) => (categoriesRefs.current[i] = el)} direction="column">
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
