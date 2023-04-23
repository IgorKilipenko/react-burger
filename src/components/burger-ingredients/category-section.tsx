import React from "react"
import { Flex, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { IngredientCard } from "./ingredient-card"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { useInViewport, BasicTarget } from "../../hooks"
import { type CategoryBase, type BurgerIngredientType } from "../../data"
import { useSelector } from "react-redux"
import { RootState, useAppSelector } from "../../services/store"

type RootElementType = HTMLDivElement

export interface CategorySectionProps {
  category: CategoryBase
  scrollContainerRef?: BasicTarget
  onCategoryInView?: (args: { categoryId: string; ratio: number }) => void
  onIngredientClick?: (ingredient: BurgerIngredientType) => void
}

export const CategorySection = React.memo(
  React.forwardRef<RootElementType, CategorySectionProps>(
    ({ category, scrollContainerRef, onCategoryInView, onIngredientClick }, ref) => {
      const ingredients = useAppSelector((store) => store.products.products)
      const { productQuantities } = useAppSelector((store) => store.burgerConstructor)
      const categoryRef = React.useRef<RootElementType | null>(null)
      const [inViewport, ratio] = useInViewport(
        categoryRef,
        {
          threshold: [0, 0.5, 1],
          root: scrollContainerRef,
        },
        true
      )

      React.useEffect(() => {
        categoryRef.current &&
          onCategoryInView &&
          inViewport &&
          onCategoryInView({
            categoryId: category.id,
            ratio: ratio ?? 0,
          })
      }, [category.id, inViewport, onCategoryInView, ratio])

      const handleIngredientClick = React.useCallback(
        (ingredient: BurgerIngredientType) => {
          onIngredientClick && onIngredientClick(ingredient)
        },
        [onIngredientClick]
      )

      const initRefs = React.useCallback(
        (el: RootElementType | null) => {
          categoryRef.current = el
          if (!ref) return
          typeof ref === "function" ? ref(el) : (ref.current = el)
        },
        [ref]
      )

      return (
        <Flex ref={initRefs} direction="column">
          <Text variant={"mainMedium"}>{capitalizeFirstLetter(category.name)}</Text>
          <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={8} rowGap={6} pl={4} pr={4} pt={6}>
            {(ingredients ?? {})[category.id]?.map((ingredient) => (
              <IngredientCard
                key={`ingredient-${ingredient._id}`}
                ingredient={ingredient}
                selectedCount={productQuantities[ingredient._id] ?? 0}
                onClick={handleIngredientClick}
              />
            ))}
          </Grid>
        </Flex>
      )
    }
  )
)
