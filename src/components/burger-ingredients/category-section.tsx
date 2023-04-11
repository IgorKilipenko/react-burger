import React from "react"
import { Flex, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { IngredientCard } from "../common"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { useInViewport } from "../../hooks"
import { type CategoryBase, type BurgerIngredientType } from "../../data"
import { useCartContext } from "../../context/cart"

export interface CategorySectionProps {
  category: CategoryBase
  ingredients: BurgerIngredientType[]
  containerRef?: React.MutableRefObject<HTMLElement | Element | null | undefined>
  onCategoryInView?: (args: { categoryId: string; ratio: number }) => void
  onIngredientClick?: (ingredient: BurgerIngredientType) => void
}

export type Ref = HTMLDivElement | null

export const CategorySection = React.memo(
  React.forwardRef<Ref, CategorySectionProps>(
    ({ category, ingredients, containerRef, onCategoryInView, onIngredientClick }, ref) => {
      const { cart } = useCartContext()
      const categoryRef = React.useRef<Ref>(null)
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
            ratio: ratio ?? 0,
          })
      }, [category.id, inViewport, onCategoryInView, ratio])

      const handleIngredientClick = React.useCallback(
        (ingredient: BurgerIngredientType) => {
          onIngredientClick && onIngredientClick(ingredient)
        },
        [onIngredientClick]
      )

      return (
        <Flex ref={categoryRef} direction="column">
          <Text variant={"mainMedium"}>{capitalizeFirstLetter(category.name)}</Text>
          <Grid gridTemplateColumns="repeat(2, 1fr)" columnGap={8} rowGap={6} pl={4} pr={4} pt={6}>
            {ingredients.map((ingredient) => (
              <IngredientCard
                key={`ingredient-${ingredient._id}`}
                ingredient={ingredient}
                selectedCount={cart.find((x) => x.item._id === ingredient._id)?.quantity ?? 0}
                onItemClick={() => {
                  handleIngredientClick(ingredient)
                }}
              />
            ))}
          </Grid>
        </Flex>
      )
    }
  )
)
