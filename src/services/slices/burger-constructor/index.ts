import { addIngredient, removeIngredient, clearBurgerConstructor } from "./burger-slice"

export { burgerSlice, burgerReducer } from "./burger-slice"
export const burgerActions = {
  addProductToCart: addIngredient,
  removeProductFromCart: removeIngredient,
  clearCart: clearBurgerConstructor,
}
export type { BurgerItemType, BurgerState } from "./burger-slice"
