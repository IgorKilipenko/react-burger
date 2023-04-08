import React from "react"
import { type BurgerIngredientType } from "../../data"

export interface BurgerConstructorProps {
  selectedIngredients?: {
    ingredient: BurgerIngredientType
    count: number
  }[]
}

declare const BurgerConstructor: React.FC<BurgerConstructorProps>

export default BurgerConstructor