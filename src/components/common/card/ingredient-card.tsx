import { useCallback, memo } from "react"
import { type BurgerIngredientType } from "../../../data"
import { Card } from "./card"

export interface IngredientCardProps {
  ingredient: BurgerIngredientType
  selectedCount?: number
  onClick?: () => void
}

const IngredientCard = memo<IngredientCardProps>(({ ingredient, selectedCount = 0, onClick }) => {
  const handleItemClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <Card
      name={ingredient.name}
      image={ingredient.image}
      price={ingredient.price}
      count={selectedCount}
      onClick={handleItemClick}
    />
  )
})

export { IngredientCard }
