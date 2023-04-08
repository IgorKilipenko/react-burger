import React from "react"
import { type BurgerIngredientType } from "../../data"

export interface BurgerConstructorProps {
  selectedIngredients?: BurgerIngredientType[]
}

declare const BurgerConstructor: React.FC<BurgerConstructorProps>

export default BurgerConstructor