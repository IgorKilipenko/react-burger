import React from "react"
import { Flex, Grid } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { IngredientCard } from "../common"
import { capitalizeFirstLetter } from "../../utils/string-processing"
import { useInViewport } from "../../utils/hooks"

export const CategorySection = React.memo(
  React.forwardRef(({ category, ingredients, containerRef, onCategoryInView }, ref) => {
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
)
