import React, { useState, HTMLAttributes } from "react"
import { categoryMapper } from "../../data"
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
  const needUpdateCategoriesRef = React.useRef<boolean | null>(false)

  React.useEffect(() => {
    if (!needUpdateCategoriesRef.current) {
      return
    }
    setCategories(() => {
      const categories = Object.keys(products).map((category) => ({
        id: category,
        name: categoryMapper(category),
      })) as CategoriesListType<TCategory>
      needUpdateCategoriesRef.current = false
      return categories
    })
  }, [products])

  const clear = () => {
    setProducts(initialValue.products)
    setCategories(initialValue.categories)
  }

  const setAllProducts = React.useCallback<typeof setProducts>((state) => {
    setProducts((prevState) => {
      const products = typeof state === "function" ? state(prevState) : state
      if (prevState !== products) {
        needUpdateCategoriesRef.current = true
      }
      return products
    })
  }, [])

  const contextValue: ProductsContextType<TProduct, TCategory> = {
    products: products,
    categories: categories,
    setProducts: setAllProducts,
    clear: clear,
  }

  return <context.Provider value={contextValue}>{children}</context.Provider>
}
