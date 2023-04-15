import React from "react"
import { type DbObjectType, type BurgerIngredientType, IngredientBase } from "../../data"

export type ProductType = DbObjectType & IngredientBase
export type ProductIdType = ProductType['_id']

export interface CartItemType<T extends ProductType> {
  item: T
  quantity: number
}

export interface CartContextType<T extends ProductType> {
  cart: CartItemType<T>[]
  addProductToCart: (item: CartItemType<T>) => void
  removeProductFromCart: (id: ProductIdType) => void
  clearCart: () => void
}

const defaultContext: CartContextType<any> = {
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
}

export function CreateCartContext<T extends ProductType>() {
  return React.createContext<CartContextType<T>>(defaultContext)
}

export const BurgerCartContext = CreateCartContext<BurgerIngredientType>()

export const useCartContext = () => React.useContext(BurgerCartContext)
