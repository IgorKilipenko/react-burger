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
import { useTabInView } from "../../hooks"

export interface BurgerIngredientsProps extends Omit<FlexProps, "direction" | keyof HTMLChakraProps<"div">> {}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ...flexOptions }) => {
  type CategoryRefType = HTMLDivElement
  type CategoryIdType = CategoryBase["id"]
  const { products: ingredientsTable, categories } = useIngredientsContext()
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const { addProductToCart, clearCart } = useCartContext()
  const categoriesRefs = React.useRef<({ ref: CategoryRefType | null } & (typeof categories)[number])[]>([])
  const [modalOpen, setModalOpen] = React.useState(false)
  const modalIngredientRef = React.useRef<BurgerIngredientType | null>(null)

  const { currentTabId, setInViewState, setCurrentTabIdForce } = useTabInView(categories)

  React.useEffect(() => {
    clearCart()
    const selectedIngredients = Object.keys(ingredientsTable).length > 0 ? selectIngredients(ingredientsTable) : []
    selectedIngredients.forEach((x) => {
      addProductToCart(x)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsTable])

  React.useEffect(() => {
    categoriesRefs.current = categories.map((c) => ({ ref: null, ...c }))
  }, [categories])

  const handleChangeActiveTab = React.useCallback(
    (tabId: CategoryIdType) => {
      categoriesRefs.current?.find((c) => c.id === tabId)?.ref?.scrollIntoView({ behavior: "smooth" })
      setCurrentTabIdForce(tabId)
      return true
    },
    [setCurrentTabIdForce]
  )

  const handleCategoryInView = React.useCallback(
    ({ categoryId, ratio }: { categoryId: CategoryIdType; ratio: number }) => {
      setInViewState({ itemIdInView: categoryId, ratio })
    },
    [setInViewState]
  )

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
        <IngredientsTabPanel onTabClick={handleChangeActiveTab} activeTabId={currentTabId as CategoryIdType} />
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
