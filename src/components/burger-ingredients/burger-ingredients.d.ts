import React from "react"
import { type CategoryBase } from "../../data"

export interface BurgerIngredientsProps {
  categories?: CategoryBase[]
  activeCategoryId?: CategoryBase
}

declare const BurgerIngredients: React.FC<BurgerIngredientsProps>

export default BurgerIngredients
