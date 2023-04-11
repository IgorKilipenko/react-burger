import React from "react"
import { Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { IngredientsTabPanel } from "./ingredients-tab-panel"
import { CategorySection } from "./category-section"
import { BurgerIngredientType, CategoryBase, IngredientsTableView } from "../../data"
import { selectIngredients } from "./utils"
import { useCartContext } from "../../context/cart"
import { Modal } from "../modal"
import { headerText, IngredientDetail } from "../ingredient-details"

export interface BurgerIngredientsProps {
  categories: CategoryBase[]
  activeCategoryId: CategoryBase["id"]
  ingredients: IngredientsTableView
}

const BurgerIngredients = ({ categories, activeCategoryId, ingredients: ingredientsTable }: BurgerIngredientsProps) => {
  const { addProductToCart } = useCartContext()
  const categoriesRefs = React.useRef<({ ref: HTMLElement | null | undefined } & (typeof categories)[number])[]>(
    categories.map((c) => ({ ref: null, ...c }))
  )
  const [currentTabId, setCurrentTabId] = React.useState(activeCategoryId)
  const ratioRef = React.useRef({ categoryId: activeCategoryId, ratio: 1 })
  const [modalOpen, setModalOpen] = React.useState(false)
  const modalIngredientRef = React.useRef<BurgerIngredientType | null>(null)

  React.useEffect(() => {
    const selectedIngredients = selectIngredients(ingredientsTable)
    selectedIngredients.forEach((x) => {
      addProductToCart(x)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    categoriesRefs.current = categoriesRefs.current.slice(0, categories.length)
  }, [categories])

  const scrollIntoCategory = React.useCallback((id: string) => {
    categoriesRefs.current?.find((c) => c.id === id)?.ref?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleChangeActiveTab = React.useCallback(
    (tabId: string) => {
      scrollIntoCategory(tabId)
      setCurrentTabId(tabId)
    },
    [scrollIntoCategory]
  )

  const handleCategoryInView = React.useCallback(({ categoryId, ratio }: { categoryId: string; ratio: number }) => {
    const activeRatio = ratioRef.current

    if (activeRatio.categoryId !== categoryId && ratio > activeRatio.ratio) {
      ratioRef.current = { ...ratioRef.current, categoryId, ratio }
      setCurrentTabId(categoryId)
      return
    }

    ratioRef.current = { ...ratioRef.current, ratio }
  }, [])

  const handleIngredientClick = React.useCallback((ingredient: BurgerIngredientType) => {
    modalIngredientRef.current = ingredient
    setModalOpen(true)
  }, [])

  return (
    <>
      <Flex ref={null} direction="column">
        <Text variant={"mainLarge"} pt={10} pb={5}>
          {capitalizeFirstLetter("соберите бургер")}
        </Text>
        <IngredientsTabPanel items={categories} onTabClick={handleChangeActiveTab} activeTabId={currentTabId} />
        <Flex direction="column" overflowY="auto" className="custom-scroll" mt={10} gap={10}>
          {categories.map((category, i) => (
            <CategorySection
              key={`category-${category.id}-${i}`}
              ref={(el) => {
                categoriesRefs.current[i].ref = el
              }}
              category={category}
              ingredients={ingredientsTable[category.id]}
              onCategoryInView={handleCategoryInView}
              onIngredientClick={handleIngredientClick}
            />
          ))}
        </Flex>
      </Flex>
      {modalOpen && modalIngredientRef.current ? (
        <Modal
          headerText={headerText}
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <IngredientDetail ingredient={modalIngredientRef!.current} />
        </Modal>
      ) : null}
    </>
  )
}

export default React.memo(BurgerIngredients)
