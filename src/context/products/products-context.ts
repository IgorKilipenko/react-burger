import React from "react"
import {
  type IngredientBase,
  type BurgerIngredientType,
  type DbObjectType,
  CategoryBase,
  IngredientsTableView,
} from "../../data"

export type ProductBaseType =  IngredientBase & DbObjectType
export type CategoriesBaseType =  CategoryBase
export type ProductsListType<T extends ProductBaseType> = IngredientsTableView<T>
export type CategoriesListType<T extends CategoriesBaseType> = T[]
//export type ProductType<T extends ProductBaseType> = ProductsListType<T>[number]

export interface ProductsContextType<TProduct extends ProductBaseType, TCategory extends CategoriesBaseType> {
  products: ProductsListType<TProduct>
  categories: CategoriesListType<TCategory>
  setProducts: (products: ProductsListType<TProduct>) => void
  setCategories: (products: CategoriesListType<TCategory>) => void
  clear: () => void
}

export const defaultContext: ProductsContextType<any,any> = {
  products: {},
  categories: [],
  setProducts: () => {},
  setCategories: () => {},
  clear: () => {}
}

export function CreateProductsContext<TProduct extends ProductBaseType, TCategory extends CategoriesBaseType>() {
  return React.createContext<ProductsContextType<TProduct, TCategory>>(defaultContext)
}

export const BurgerProductsContext = CreateProductsContext<BurgerIngredientType, CategoriesBaseType>()

export const useIngredientsContext = () => React.useContext(BurgerProductsContext)
