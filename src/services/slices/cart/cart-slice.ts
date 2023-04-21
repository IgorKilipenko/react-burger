import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BurgerIngredientType, DbIndexType, DbObjectType, IngredientBase } from "../../../data"

export type ProductType = DbObjectType & IngredientBase
export type ProductIdType = DbIndexType

export interface CartItemType<T extends ProductType> {
  item: T
  quantity: number
}

export interface CartState<T extends ProductType> {
  products: CartItemType<T>[]
}

export type BurgerCartItemType = CartItemType<BurgerIngredientType>
export type BurgerCartState = CartState<BurgerIngredientType>

const initialState: BurgerCartState = {
  products: [],
}

const getProductById = <T extends ProductType>(id: DbIndexType, products: CartState<T>["products"]) => {
  return products.find((p) => p.item._id === id)
}

const getProductsByType = <T extends ProductType>(type: ProductType["type"], products: CartState<T>["products"]) => {
  return products.filter((p) => p.item.type === type)
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<BurgerCartItemType>) => {
      const { item: product, quantity } = action.payload

      if (product.type === "bun") {
        const rmProducts = getProductsByType(product.type, state.products)
        state.products = rmProducts
          ? state.products.filter((p) => rmProducts.findIndex((x) => p.item._id === x.item._id))
          : state.products
      }

      const existingProduct = getProductById(product._id, state.products)
      if (!existingProduct) {
        state.products.push({ item: product, quantity })
      } else {
        state.products = state.products.map((product) =>
          product.item._id === existingProduct.item._id
            ? {
                item: product.item,
                quantity: product.quantity + product.quantity,
              }
            : product
        )
      }
    },
    removeProductFromCart: (state, action: PayloadAction<ProductType>) => {
      const id = action.payload._id
      state.products = state.products.reduce<typeof state.products>((res, product) => {
        let updatedProduct: typeof product | null = product
        if (product.item._id === id) {
          updatedProduct.quantity--
          updatedProduct = updatedProduct.quantity > 0 ? product : null
        }
        updatedProduct && res.push(updatedProduct)
        return res
      }, [])
    },
    clearCart: (state) => {
      state.products = []
    },
  },
})

export const { addProductToCart, removeProductFromCart, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
