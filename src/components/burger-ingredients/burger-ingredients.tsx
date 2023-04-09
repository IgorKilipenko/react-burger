import React from "react"
import { Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { IngredientsTabPanel } from "./ingredients-tab-panel"
import { CategorySection } from "./category-section"
import { CategoryBase, IngredientsTableView } from "../../data"

export interface BurgerIngredientsProps {
  categories: CategoryBase[]
  activeCategoryId: CategoryBase["id"]
  ingredients: IngredientsTableView
}

const BurgerIngredients = ({ categories, activeCategoryId, ingredients }: BurgerIngredientsProps) => {
  const categoriesRefs = React.useRef<({ ref: HTMLElement | null | undefined } & (typeof categories)[number])[]>(
    categories.map((c) => ({ ref: null, ...c }))
  )
  const [currentTabId, setCurrentTabId] = React.useState(activeCategoryId)
  const ratioRef = React.useRef({ categoryId: activeCategoryId, ratio: 1 })

  React.useEffect(() => {
    categoriesRefs.current = categoriesRefs.current.slice(0, categories.length)
  }, [categories])

  const scrollIntoCategory = (id: string) => {
    categoriesRefs.current?.find((c) => c.id === id)?.ref?.scrollIntoView({ behavior: "smooth" })
  }

  const handleChangeActiveTab = (tabId: string) => {
    scrollIntoCategory(tabId)
    setCurrentTabId(tabId)
  }

  const handleCategoryInView = ({ categoryId, ratio }: { categoryId: string; ratio: number }) => {
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
    <Flex ref={null} direction="column">
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
            ingredients={ingredients[category.id]}
            onCategoryInView={handleCategoryInView}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default React.memo(BurgerIngredients)
