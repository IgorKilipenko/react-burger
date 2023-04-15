import React, { useState, HTMLAttributes } from "react"
import { type CartContextType, type CartItemType, type ProductType } from "./cart-context"

export type CartContextProps<T extends ProductType> = {
  context: React.Context<CartContextType<T>>
} & HTMLAttributes<HTMLDivElement>

export declare type ProductItemType<T extends ProductType> = CartItemType<T>
export declare type ProductsListType<T extends ProductType> = ProductItemType<T>[]

export function CartContextProvider<T extends ProductType>({ children, context }: CartContextProps<T>) {
  const [products, setProducts] = useState<ProductsListType<T>>([])

  const getProductById = (id: string, prevState: ProductsListType<T>): CartItemType<T> | undefined => {
    return prevState.find((p) => p.item._id === id)
  }

  const getProductsByType = (type: string, prevState: ProductsListType<T>) => {
    return prevState.filter((p) => p.item.type === type)
  }

  const addProductToCart = (product: ProductItemType<T>): void => {
    setProducts((prevState) => {
      if (product.item.type === "bun") {
        const rmProducts = getProductsByType(product.item.type, prevState)
        prevState = rmProducts
          ? prevState.filter((p) => rmProducts.findIndex((x) => p.item._id === x.item._id))
          : prevState
      }

      const existingProduct = getProductById(product.item._id, prevState)
      if (!existingProduct) {
        return [...prevState, product]
      }

      const newState = prevState.map((product) =>
        product.item._id === existingProduct.item._id
          ? {
              item: product.item,
              quantity: product.quantity + product.quantity,
            }
          : product
      )
      return newState
    })
  }

  const removeProductFromCart = (product: T) => {
    setProducts((prevState) => {
      const updatedProducts = prevState.reduce<typeof prevState>((res, p) => {
        let updatedProduct:typeof p | null = p
        if (p.item._id === product._id) {
          updatedProduct.quantity--
          updatedProduct = updatedProduct.quantity > 0 ? p : null
        }
        updatedProduct && res.push(updatedProduct)
        return res
      },[])
      return updatedProducts
    })
  }

  const clearCart = () => {
    setProducts([])
  }

  const contextValue: CartContextType<T> = {
    cart: products,
    addProductToCart: addProductToCart,
    removeProductFromCart: removeProductFromCart,
    clearCart: clearCart,
  }

  return <context.Provider value={contextValue}>{children}</context.Provider>
}
