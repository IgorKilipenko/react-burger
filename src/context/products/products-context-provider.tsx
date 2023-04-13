import React, { useState, HTMLAttributes } from "react"
import { Omitted } from "../../utils/types"
import {
  type ProductBaseType,
  type ProductsContextType,
  type CategoriesBaseType,
  ProductsListType,
  CategoriesListType,
} from "./products-context"

const initialValues = { products: {}, categories: [] }

export type ProductsContextProps<TProduct extends ProductBaseType, TCategory extends CategoriesBaseType> = {
  context: React.Context<ProductsContextType<TProduct, TCategory>>
  children: HTMLAttributes<HTMLDivElement>["children"]
  initialValue?: Omit<
    ProductsContextType<TProduct, TCategory>,
    Omitted<ProductsContextType<TProduct, TCategory>, ProductsListType<TProduct> | CategoriesListType<TCategory>>
  >
} & HTMLAttributes<HTMLDivElement>

export function ProductsContextProvider<TProduct extends ProductBaseType, TCategory extends CategoriesBaseType>({
  children,
  context,
  initialValue = {
    products: initialValues.products,
    categories: initialValues.categories,
  },
}: ProductsContextProps<TProduct, TCategory>) {
  const [products, setProducts] = useState<ProductsContextType<TProduct, TCategory>["products"]>(initialValue.products)
  const [categories, setCategories] = useState<ProductsContextType<TProduct, TCategory>["categories"]>(
    initialValue.categories
  )

  const clear = () => {
    setProducts(initialValue.products)
    setCategories(initialValue.categories)
  }

  const contextValue: ProductsContextType<TProduct, TCategory> = {
    products: products,
    categories: categories,
    setProducts: setProducts,
    setCategories: setCategories,
    clear: clear,
  }

  return <context.Provider value={contextValue}>{children}</context.Provider>
}
