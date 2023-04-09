import React from "react"
import { type BurgerIngredientType } from "../../data"

export type CartItemBaseType = BurgerIngredientType

export interface CartListItemType<T extends CartItemBaseType> {
  item: T
  quantity: number
}

export interface CartContextType<T extends CartItemBaseType> {
  cart: CartListItemType<T>[]
  addProductToCart: (item: CartListItemType<T>) => void
  removeProductFromCart: (item: T) => void
}

const defaultContext: CartContextType<any> = {
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
}

export function CreateCartContext<T extends CartItemBaseType>() {
  return React.createContext<CartContextType<T>>(defaultContext)
}
