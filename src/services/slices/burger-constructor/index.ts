import { RootState } from "../../store"
import { addIngredient, removeIngredient, clearBurgerConstructor, swapItemsByIndex, clearSelectedIngredients, clearBuns } from "./burger-slice"

export { burgerReducer } from "./burger-slice"
export const burgerActions = {
  addProductToCart: addIngredient,
  removeProductFromCart: removeIngredient,
  clearCart: clearBurgerConstructor,
  swapItemsByIndex,
  clearSelectedIngredients,
  clearBuns
}
export type { BurgerItemType, BurgerState } from "./burger-slice"

export const getBurgerStore = (state: RootState) => state.burgerConstructor
export const getIngredientsFromBurgerStore = (state: RootState) => state.burgerConstructor.products
export const getBunFromBurgerStore = (state: RootState) => state.burgerConstructor.bun
export const getProductQuantitiesBurgerStore = (state: RootState) => state.burgerConstructor.productQuantities