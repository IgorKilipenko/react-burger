import { addIngredient, removeIngredient, clearBurgerConstructor, swapItemsByIndex } from "./burger-slice"

export { burgerSlice, burgerReducer } from "./burger-slice"
export const burgerActions = {
  addProductToCart: addIngredient,
  removeProductFromCart: removeIngredient,
  clearCart: clearBurgerConstructor,
  swapItemsByIndex
}
export type { BurgerItemType, BurgerState } from "./burger-slice"
