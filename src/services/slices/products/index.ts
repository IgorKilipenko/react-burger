import { RootState } from "../../store"

export { productsReducer, clearProducts, getAllIngredients } from "./products-slice"

export const getProductsStore = (state: RootState) => state.products
export const getProductsFromProductsStore = (state: RootState) => state.products.products
export const getCategoriesFromProductsStore = (state: RootState) => state.products.categories