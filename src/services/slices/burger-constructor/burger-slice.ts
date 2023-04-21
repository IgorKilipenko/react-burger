import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { allowableCategories, BurgerIngredientType, DbObjectType, IngredientBase } from "../../../data"
import { uid } from "uid"

export type ProductBase = DbObjectType & IngredientBase
export type ProductIdType = ProductBase["_id"]

export interface OrderedItemType {
  uid: string
  sortIndex: number
}

export type QuantitiesRecord<T extends ProductIdType> = Record<T, number>

interface BurgerItemBase<T extends ProductBase> extends Partial<OrderedItemType> {
  product: T
}

interface BurgerStateBase<TProduct extends ProductBase> {
  products: BurgerItemBase<TProduct>[]
  productQuantities: QuantitiesRecord<ProductIdType>
}

export type BurgerItemType = BurgerItemBase<BurgerIngredientType>
export type BurgerState = BurgerStateBase<BurgerIngredientType>

const initialState: BurgerState = {
  products: [],
  productQuantities: {},
}

const getProductById = <T extends ProductBase>(id: ProductIdType, products: BurgerStateBase<T>["products"]) => {
  return products.find((item) => item.product._id === id)
}

const getProductsByType = <T extends ProductBase>(
  type: ProductBase["type"],
  products: BurgerStateBase<T>["products"]
) => {
  return products.filter((item) => item.product.type === type)
}

export const burgerSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    clearBuns: (state) => {
      const rmProducts = getProductsByType(allowableCategories.bun, state.products)
      state.products = rmProducts
        ? state.products.filter((p) => rmProducts.findIndex((x) => p.product._id === x.product._id))
        : state.products
      rmProducts.forEach((p) => {
        delete state.productQuantities[p.product._id]
      })
    },
    addIngredient: (state, action: PayloadAction<BurgerItemType & { quantity?: number }>) => {
      console.assert(action.payload?.quantity && action.payload.quantity > 0)

      const { product, quantity = 0 } = action.payload

      if (product.type === allowableCategories.bun) {
        burgerSlice.caseReducers.clearBuns(state)
      }

      const existingProduct = getProductById(product._id, state.products)
      if (!existingProduct) {
        const prevLength = state.products.length
        Array(quantity)
          .fill(0)
          .forEach((_, i) => state.products.push({ product, uid: uid(), sortIndex: i + prevLength }))
      } else {
        /// update product and quantities
        state.products.forEach((item, i, products) => {
          if (item.product._id === existingProduct.product._id) {
            products[i] = { ...item, ...product }
          }
        })
      }
      state.productQuantities[product._id] =
        product.type === allowableCategories.bun ? 1 : state.productQuantities[product._id] ?? 0 + quantity
    },
    removeIngredient: (state, action: PayloadAction<{ id: ProductIdType } | { uid: OrderedItemType["uid"] }>) => {
      const id = "id" in action.payload ? action.payload.id : null
      const uid = "uid" in action.payload ? action.payload.uid : null

      console.assert(id || uid)

      const eraseIndex = !uid
        ? state.products.reduce<number>((res, item, i) => {
            return item.product._id === id ? i : res
          }, -1)
        : state.products.findIndex((item) => item.uid === uid)
      if (eraseIndex >= 0) {
        const product = state.products[eraseIndex].product
        --state.productQuantities[product._id] <= 0 && delete state.productQuantities[product._id]
        state.products.splice(eraseIndex, 1)
      }
    },
    clearBurgerConstructor: (state) => {
      state = initialState
    },
  },
})

export const { addIngredient, removeIngredient, clearBurgerConstructor, clearBuns } = burgerSlice.actions
export const burgerReducer = burgerSlice.reducer
