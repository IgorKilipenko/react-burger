import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { allowableCategories, BurgerIngredientType, DbObjectType, IngredientBase } from "../../../data"

type ProductBase = DbObjectType & IngredientBase
type ProductIdType = ProductBase["_id"]

export interface OrderedItemType {
  uid: string
}

interface BurgerItemBase<T extends ProductBase> extends OrderedItemType {
  product: T
}

export type QuantitiesRecord<T extends ProductIdType> = Record<T, number>

interface BurgerStateBase<TProduct extends ProductBase> {
  bun?: BurgerItemBase<TProduct> | null
  products: BurgerItemBase<TProduct>[]
  productQuantities: QuantitiesRecord<ProductIdType>
}

export type BurgerItemType = BurgerItemBase<BurgerIngredientType>
export type BurgerState = BurgerStateBase<BurgerIngredientType>

const initialState: BurgerState = {
  bun: null,
  products: [],
  productQuantities: {},
}

const burgerSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    clearBuns: (state) => {
      if (state.bun) {
        delete state.productQuantities[state.bun.product._id]
        state.bun = initialState.bun
      }
    },

    addIngredient: (state, action: PayloadAction<BurgerItemType>) => {
      let { product, uid } = action.payload
      const isBunType = product.type === allowableCategories.bun

      if (isBunType) {
        state.bun?.product._id !== product._id && burgerSlice.caseReducers.clearBuns(state)
        state.bun = { uid, product }
      } else {
        state.products.push({ uid, product })
      }

      state.productQuantities[product._id] = isBunType ? 1 : (state.productQuantities[product._id] ?? 0) + 1
    },

    removeIngredient: (state, action: PayloadAction<{ uid: OrderedItemType["uid"] }>) => {
      const { uid } = action.payload

      const eraseIndex = state.products.findIndex((item) => item.uid === uid)
      console.assert(eraseIndex >= 0)

      const product = state.products[eraseIndex].product
      --state.productQuantities[product._id] <= 0 && delete state.productQuantities[product._id]
      state.products.splice(eraseIndex, 1)
    },

    clearBurgerConstructor: (state) => {
      state = initialState
    },

    swapItemsByIndex: (
      state,
      action: PayloadAction<{
        fromIdx: number
        toIdx: number
      }>
    ) => {
      let { fromIdx, toIdx } = action.payload

      if (fromIdx === toIdx) return
      console.assert(fromIdx >= 0 && toIdx >= 0 && fromIdx < state.products.length && toIdx < state.products.length)

      const buff = { ...state.products[fromIdx], sortIndex: toIdx }
      state.products[fromIdx] = { ...state.products[toIdx] }
      state.products[toIdx] = buff
    },
  },
})

export const { addIngredient, removeIngredient, clearBurgerConstructor, swapItemsByIndex, clearBuns } =
  burgerSlice.actions
export const burgerReducer = burgerSlice.reducer
