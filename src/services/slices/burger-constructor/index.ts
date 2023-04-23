import { RootState } from "../../store"
import { addIngredient, removeIngredient, clearBurgerConstructor, swapItemsByIndex } from "./burger-slice"

export { burgerReducer } from "./burger-slice"
export const burgerActions = {
  addProductToCart: addIngredient,
  removeProductFromCart: removeIngredient,
  clearCart: clearBurgerConstructor,
  swapItemsByIndex
}
export type { BurgerItemType, BurgerState } from "./burger-slice"

export const getBurgerStore = (state: RootState) => state.burgerConstructor
export const getIngredientsFromBurgerStore = (state: RootState) => state.burgerConstructor.products
export const getBunFromBurgerStore = (state: RootState) => state.burgerConstructor.bun
export const getProductQuantitiesBurgerStore = (state: RootState) => state.burgerConstructor.productQuantities