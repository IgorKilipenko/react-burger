import React, { useState, HTMLAttributes } from "react"
import { type CartContextType, type CartListItemType, type CartItemBaseType } from "./cart-context"

export type CartContextProps<T extends CartItemBaseType> = {
  context: React.Context<CartContextType<T>>
} & HTMLAttributes<HTMLDivElement>

export function CartContextProvider<T extends CartItemBaseType>({ children, context }: CartContextProps<T>) {
  const [products, setProducts] = useState<CartListItemType<T>[]>([])

  const getProductById = (id: string): CartListItemType<T> | undefined => {
    return products.find((p) => p.item.__id === id)
  }

  const addProductToCart = (product: CartListItemType<T>): void => {
    const existingProduct = getProductById(product.item.__id)
    let newState: CartListItemType<T>[] = []
    if (existingProduct) {
      newState = products.map((p) =>
        p.item.__id === existingProduct.item.__id
          ? {
              item: p.item,
              quantity: p.quantity + product.quantity,
            }
          : p
      )
      setProducts(newState)
    }
    setProducts([...products, product])
  }

  const removeProductFromCart = (product: T) => {
    const newProducts = products.filter((p) => p.item.__id !== product.__id)

    setProducts(newProducts)
  }

  const contextValue: CartContextType<T> = {
    cart: products,
    addProductToCart: addProductToCart,
    removeProductFromCart: removeProductFromCart,
  }

  return <context.Provider value={contextValue}>{children}</context.Provider>
}
