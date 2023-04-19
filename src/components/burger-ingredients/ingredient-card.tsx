import { useCallback, memo } from "react"
import { type BurgerIngredientType } from "../../data"
import { Card } from "../common/card/card"
import { useDrag } from "react-dnd"

export interface IngredientCardProps {
  ingredient: BurgerIngredientType
  selectedCount?: number
  onClick?: (ingredient: BurgerIngredientType) => void
}

const IngredientCard = memo<IngredientCardProps>(({ ingredient, selectedCount = 0, onClick }) => {
  const handleItemClick = useCallback(() => {
    onClick && onClick(ingredient)
  }, [ingredient, onClick])
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  })

  return (
    <Card
      ref={dragRef}
      name={ingredient.name}
      image={ingredient.image}
      price={ingredient.price}
      count={selectedCount}
      options={{ imageProps: { h: 120 } }}
      onClick={handleItemClick}
    />
  )
})

export { IngredientCard }
