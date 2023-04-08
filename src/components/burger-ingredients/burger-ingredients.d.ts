import React from "react"
import { type CategoryBase, IngredientsTableView } from "../../data"

export interface BurgerIngredientsProps {
  categories: CategoryBase[]
  activeCategoryId: CategoryBase['id']
  ingredients: IngredientsTableView
}

declare const BurgerIngredients: React.FC<BurgerIngredientsProps>

export default BurgerIngredients
