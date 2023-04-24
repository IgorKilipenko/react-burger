import React from "react"
import { Flex, Text, FlexProps, type HTMLChakraProps } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { IngredientsTabPanel } from "./ingredients-tab-panel"
import { CategorySection } from "./category-section"
import { BurgerIngredientType, CategoryBase } from "../../data"
import { selectIngredients } from "./utils"
import { Modal } from "../modal"
import { headerText, IngredientDetail } from "../ingredient-details"
import { useTabInView } from "../../hooks"
import { burgerActions } from "../../services/slices/burger-constructor"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { clearActiveIngredient, setActiveIngredient } from "../../services/slices/active-modal-items"
import { getProductsStore } from "../../services/slices/products"
import { uid } from "uid"

export interface BurgerIngredientsProps extends Omit<FlexProps, "direction" | "dir" | keyof HTMLChakraProps<"div">> {}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ...flexOptions }) => {
  type CategoryRefType = HTMLDivElement
  type CategoryIdType = CategoryBase["id"]

  const dispatch = useAppDispatch()
  const { addProductToCart, clearCart } = burgerActions
  const { products: ingredientsTable, categories } = useAppSelector(getProductsStore)

  /// Need for calculate adaptive inView rate in CategorySection
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const categoriesRefs = React.useRef<
    ({ ref: CategoryRefType | null } & NonNullable<typeof categories>[number])[] | null
  >(null)

  const [modalOpen, setModalOpen] = React.useState(false)

  const { currentTabId, setInViewState, setCurrentTabIdForce } = useTabInView(categories!)

  /// Mock select ingredients for constructor (need remove from production!)
  React.useEffect(() => {
    dispatch(clearCart())
    const selectedIngredients =
      Object.keys(ingredientsTable ?? {}).length > 0
        ? selectIngredients({ ingredients: ingredientsTable ?? {}, maxQuantity: 0 })
        : []
    selectedIngredients.forEach((x) => {
      dispatch(addProductToCart({ product: x.item, uid: uid() }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsTable])

  /// Initialize refs to categories elements
  React.useEffect(() => {
    categoriesRefs.current = !categories ? null : categories.map((c) => ({ ref: null, ...c }))
  }, [categories])

  /// Force scroll to category when tab is clicked
  const handleTabClick = React.useCallback(
    (tabId: CategoryIdType) => {
      categoriesRefs.current?.find((c) => c.id === tabId)?.ref?.scrollIntoView({ behavior: "smooth" })
      setCurrentTabIdForce(tabId)
      return true
    },
    [setCurrentTabIdForce]
  )

  /// Handle category inVew ratio changes on scroll
  /// then pass info to useTabInView hook for calculate active tab
  const handleCategoryInView = React.useCallback(
    ({ categoryId, ratio }: { categoryId: CategoryIdType; ratio: number }) => {
      setInViewState({ itemIdInView: categoryId, ratio })
    },
    [setInViewState]
  )

  /// Open modal category details for selected ingredient
  const handleIngredientClick = React.useCallback(
    (ingredient: BurgerIngredientType) => {
      dispatch(setActiveIngredient(ingredient))
      setModalOpen(true)
    },
    [dispatch]
  )

  const handleModalClose = React.useCallback(() => {
    setModalOpen(false)
    dispatch(clearActiveIngredient())
  }, [dispatch])

  return (
    <>
      <Flex direction="column" {...flexOptions}>
        <Text variant={"mainLarge"} pt={10} pb={5}>
          {capitalizeFirstLetter("соберите бургер")}
        </Text>
        <IngredientsTabPanel
          onTabClick={handleTabClick}
          activeTabId={currentTabId as CategoryIdType}
          options={{ container: { justify: "center" } }}
        />
        <Flex ref={scrollContainerRef} direction="column" overflowY="auto" className="custom-scroll" mt={10} gap={10}>
          {categories?.map((category, i) => (
            <CategorySection
              key={`category-${category.id}-${i}`}
              ref={(el) => {
                if (categoriesRefs.current) categoriesRefs.current[i].ref = el
              }}
              category={category}
              onCategoryInView={handleCategoryInView}
              onIngredientClick={handleIngredientClick}
              scrollContainerRef={scrollContainerRef}
            />
          ))}
        </Flex>
      </Flex>
      {modalOpen ? (
        <Modal headerText={headerText} onClose={handleModalClose}>
          <IngredientDetail />
        </Modal>
      ) : null}
    </>
  )
}

export default React.memo(BurgerIngredients)
