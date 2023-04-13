import React from "react"
import { Flex, Text, FlexProps, type HTMLChakraProps } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { IngredientsTabPanel } from "./ingredients-tab-panel"
import { CategorySection } from "./category-section"
import { BurgerIngredientType, CategoryBase } from "../../data"
import { selectIngredients } from "./utils"
import { useCartContext } from "../../context/cart"
import { Modal } from "../modal"
import { headerText, IngredientDetail } from "../ingredient-details"
import { useIngredientsContext } from "../../context/products"

export interface BurgerIngredientsProps extends Omit<FlexProps, "direction" | keyof HTMLChakraProps<"div">> {}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ...flexOptions }) => {
  type CategoryRefType = HTMLDivElement
  const { products: ingredientsTable, categories } = useIngredientsContext()
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const { addProductToCart } = useCartContext()
  const categoriesRefs = React.useRef<({ ref: CategoryRefType | null } & (typeof categories)[number])[]>([])
  const activeCategoryId: CategoryBase["id"] = categories[0]?.id
  const [currentTabId, setCurrentTabId] = React.useState(activeCategoryId)
  const ratioRef = React.useRef({ categoryId: activeCategoryId, ratio: 1 })
  const [modalOpen, setModalOpen] = React.useState(false)
  const modalIngredientRef = React.useRef<BurgerIngredientType | null>(null)

  React.useEffect(() => {
    const selectedIngredients = Object.keys(ingredientsTable).length > 0 ? selectIngredients(ingredientsTable) : []
    selectedIngredients.forEach((x) => {
      addProductToCart(x)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsTable])

  React.useEffect(() => {
    categoriesRefs.current = categories.map((c) => ({ ref: null, ...c }))
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
      <Flex direction="column" {...flexOptions}>
        <Text variant={"mainLarge"} pt={10} pb={5}>
          {capitalizeFirstLetter("соберите бургер")}
        </Text>
        <IngredientsTabPanel onTabClick={handleChangeActiveTab} activeTabId={currentTabId} />
        <Flex ref={scrollContainerRef} direction="column" overflowY="auto" className="custom-scroll" mt={10} gap={10}>
          {categoriesRefs.current?.map((category, i) => (
            <CategorySection
              key={`category-${category.id}-${i}`}
              ref={(el) => {
                categoriesRefs.current[i].ref = el
              }}
              category={category}
              onCategoryInView={handleCategoryInView}
              onIngredientClick={handleIngredientClick}
              scrollContainerRef={scrollContainerRef}
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
