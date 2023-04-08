import React from "react"
import { Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { data as rawData } from "../../utils/data"
import { IngredientsTabPanel } from "./ingredients-tab-panel"
import { CategorySection } from "./category-section"

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

const BurgerIngredients = React.memo(({ categories, activeCategoryId }) => {
  const data = loadIngredients()
  const categoriesRefs = React.useRef(categories.map((c) => ({ ref: null, ...c })))
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
      <IngredientsTabPanel items={categories} onTabClick={handleChangeActiveTab} activeTabId={currentTabId} />
      <Flex direction="column" overflowY="auto" className="custom-scroll" mt={10} gap={10}>
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
})

export default BurgerIngredients
