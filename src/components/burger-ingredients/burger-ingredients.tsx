import React from "react"
import { Flex, Text, FlexProps, type HTMLChakraProps } from "@chakra-ui/react"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { IngredientsTabPanel } from "./ingredients-tab-panel"
import { CategorySection } from "./category-section"
import { BurgerIngredientType, CategoryBase } from "../../data"
import { Modal } from "../modal"
import { headerText } from "../ingredient-details"
import { useTabInView } from "../../hooks"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { clearActiveIngredient, setActiveIngredient } from "../../services/slices/active-modal-items"
import { getProductsStore } from "../../services/slices/products"
import { Outlet, useMatches, useNavigate, useLocation } from "react-router-dom"
import { routesInfo } from "../app-router"

export interface BurgerIngredientsProps extends Omit<FlexProps, "direction" | "dir" | keyof HTMLChakraProps<"div">> {}
type CategoryRefType = HTMLDivElement
type CategoryIdType = CategoryBase["id"]

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ...flexOptions }) => {
  const dispatch = useAppDispatch()
  const { products: ingredientsTable, categories } = useAppSelector(getProductsStore)

  /// Need for calculate adaptive inView rate in CategorySection
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const categoriesRefs = React.useRef<
    ({ ref: CategoryRefType | null } & NonNullable<typeof categories>[number])[] | null
  >(null)

  const [modalOpen, setModalOpen] = React.useState(false)

  const { currentTabId, setInViewState, setCurrentTabIdForce } = useTabInView(categories!)

  const matches = useMatches()
  const navigate = useNavigate()
  const { state: locationState } = useLocation()

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
      navigate(`${routesInfo.ingredientItem.rootPath}/${ingredient._id}`, { state: { ingredient } })
    },
    [navigate]
  )

  const closeModal = React.useCallback(() => {
    setModalOpen(false)
    dispatch(clearActiveIngredient())
    navigate("", { replace: true })
  }, [dispatch, navigate])

  React.useEffect(() => {
    if (!ingredientsTable) {
      return
    }

    const routeIngredientMatch = matches.find(
      (m) => m.id === routesInfo.ingredientItem.id && m.params && m.params[routesInfo.ingredientItem.paramName]
    )
    if (!routeIngredientMatch) {
      if (modalOpen) {
        closeModal()
      }
      return
    }

    const id = routeIngredientMatch!.params!.id!
    const ingredient =
      (locationState?.ingredient as BurgerIngredientType) ??
      Object.values(ingredientsTable).reduce<BurgerIngredientType | null | undefined>((res, item) => {
        return res ?? item.find((p) => p._id === id)
      }, null)

    if (ingredient) {
      dispatch(setActiveIngredient(ingredient))
      setModalOpen(true)
    } else {
      navigate("*", { replace: true })
    }
  }, [closeModal, dispatch, ingredientsTable, locationState?.ingredient, matches, modalOpen, navigate])

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
        <Modal headerText={headerText} onClose={closeModal}>
          <Outlet />
        </Modal>
      ) : null}
    </>
  )
}

export default React.memo(BurgerIngredients)
