import React from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { Flex, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { IngredientCard } from "../common"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { data as rawData } from "../../utils/data"
import { useInViewport } from "../../utils/hooks"

const ingredientCategories = [
  { id: "bun", name: "булки" },
  { id: "sauce", name: "соусы" },
  { id: "main", name: "начинки" },
]

const IngredientsTabPanel = ({ items, onChangeActiveTab, activeTabId = items[0].id }) => {
  const [current, setCurrent] = React.useState(activeTabId)

  React.useEffect(() => {
    setCurrent(activeTabId)
  }, [activeTabId])

  const handleTabItemClick = (tabId) => {
    setCurrent(tabId)
    onChangeActiveTab && onChangeActiveTab(tabId)
  }

  return (
    <Flex>
      {items.map((item, i) => (
        <Tab key={`tab-${item.id}`} value={item.id} active={current === item.id} onClick={() => handleTabItemClick(item.id)}>
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

const CategorySection = React.forwardRef(({ category, ingredients, containerRef, onCategoryInView }, ref) => {
  const categoryRef = React.useRef()
  const [inViewport, ratio] = useInViewport(categoryRef, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    root: containerRef,
  })

  React.useEffect(() => {
    categoryRef.current &&
      onCategoryInView &&
      inViewport &&
      onCategoryInView({
        categoryId: category.id,
        ratio,
        /*offsets: { top: categoryRef.current.offsetTop, height: categoryRef.current.offsetHeight, 
          heightRatio: (categoryRef.current.offsetHeight / categoryRef.current)},*/
      })
  }, [category.id, inViewport, onCategoryInView, ratio])

  const initRefs = (el) => {
    categoryRef.current = el
    if (!ref) return
    typeof ref === "function" ? ref(el) : (ref.current = el)
  }

  return (
    <Flex ref={(el) => initRefs(el)} /*key={`category-${category.id}-${i}`}*/ direction="column">
      <Text variant={"mainMedium"}>{capitalizeFirstLetter(category.name)}</Text>
      <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={8} rowGap={6} pl={4} pr={4} pt={6}>
        {ingredients.map((ingredient) => (
          <IngredientCard key={"ingredient-" + ingredient._id} ingredient={ingredient} />
        ))}
      </Grid>
    </Flex>
  )
})

const BurgerIngredients = ({ categories = ingredientCategories, activeCategoryId = ingredientCategories[0].id }) => {
  const data = loadIngredients()
  const categoriesRefs = React.useRef(categories.map((c) => ({ ref: null, ...c })))
  const containerRef = React.useRef()
  const [currentTabId, setCurrentTabId] = React.useState(activeCategoryId)
  const ratioRef = React.useRef({ categoryId: activeCategoryId, ratio: 1 })

  React.useEffect(() => {
    categoriesRefs.current = categoriesRefs.current.slice(0, categories.length)
  }, [categories])

  const scrollIntoCategory = (id) => {
    categoriesRefs.current?.find((c) => c.id === id)?.ref?.scrollIntoView({ behavior: "smooth" })
  }

  const handleChangeActiveTab = (tabId) => {
    scrollIntoCategory(tabId)
    setCurrentTabId(tabId)
  }

  const handleCategoryInView = ({ categoryId, ratio }) => {
    const activeRatio = ratioRef.current
    if (activeRatio.categoryId === categoryId) {
      ratioRef.current = { ...ratioRef.current, ratio }
      return
    }
    if (ratio > activeRatio.ratio) {
      ratioRef.current = { ...ratioRef.current, categoryId, ratio }
      setCurrentTabId(categoryId)
    }
  }

  return (
    <Flex direction="column">
      <Text variant={"mainLarge"} pt={10} pb={5}>
        {capitalizeFirstLetter("соберите бургер")}
      </Text>
      <IngredientsTabPanel
        items={ingredientCategories}
        onChangeActiveTab={handleChangeActiveTab}
        activeTabId={currentTabId}
      />
      <Flex ref={containerRef} direction="column" overflowY="auto" className="custom-scroll" mt={10} gap={10}>
        {categories.map((category, i) => (
          <CategorySection
            key={`category-${category.id}-${i}`}
            ref={(el) => (categoriesRefs.current[i].ref = el)}
            category={category}
            ingredients={data[category.id]}
            onCategoryInView={handleCategoryInView}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default BurgerIngredients
