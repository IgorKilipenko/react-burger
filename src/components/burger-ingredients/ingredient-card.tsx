import { useCallback, memo } from "react"
import { type BurgerIngredientType } from "../../data"
import { Card } from "../common/card/card"
import { useDrag } from "react-dnd"
import { testsConfig } from "../../utils/test-utils"

export interface IngredientCardProps {
  ingredient: BurgerIngredientType
  selectedCount?: number
  onClick?: (ingredient: BurgerIngredientType) => void
}

const IngredientCard = memo<IngredientCardProps>(({ ingredient, selectedCount = 0, onClick }) => {
  const handleItemClick = useCallback(() => {
    onClick && onClick(ingredient)
  }, [ingredient, onClick])
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient: { ...ingredient } },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
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
      {...{[testsConfig.dataTestIdAttribute]:`ingredient_id_${ingredient._id}`}}
    />
  )
})

export { IngredientCard }
