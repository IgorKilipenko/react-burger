import { addProductToCart, removeProductFromCart, clearCart } from "./cart-slice"

export { cartSlice, cartReducer } from "./cart-slice"
export const cartActions = { addProductToCart, removeProductFromCart, clearCart }
export type { BurgerCartItemType, BurgerCartState } from "./cart-slice"
