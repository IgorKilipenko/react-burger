import React from "react";

export interface CartItemBaseType {
    __id: string | number;
    price: number;
}

export interface CartListItemType<TItemType extends CartItemBaseType> {
  item: TItemType
  quantity: number
}

export interface CartContextType<TItemType extends CartItemBaseType> {
  cart: CartListItemType<TItemType>[]
  addProductToCart: (item: CartListItemType<TItemType>) => void
  removeProductFromCart: (item: TItemType) => void
}

const defaultContext: CartContextType<any> = {
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {}
}

export function CreateCartContext<TItemType extends CartItemBaseType>() {
  return React.createContext < CartContextType < TItemType >> (defaultContext)
}
