import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { allowableCategories, BurgerIngredientType, DbObjectType, IngredientBase } from "../../../data"
import { uid } from "uid"

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

    addIngredient: {
      reducer: (state, action: PayloadAction<BurgerItemType>) => {
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
      prepare: (ingredient: Omit<BurgerItemType, "uid">) => {
        return { payload: { uid: uid(), ...ingredient } }
      },
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
      state.bun = initialState.bun
      state.productQuantities = initialState.productQuantities
      state.products = initialState.products
    },

    clearSelectedIngredients: (state) => {
      state.productQuantities = state.bun
        ? { [state.bun.product._id]: state.productQuantities[state.bun.product._id] }
        : initialState.productQuantities
      state.products = initialState.products
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

      const buff = state.products[fromIdx]
      state.products[fromIdx] = state.products[toIdx]
      state.products[toIdx] = buff
    },
  },
})

export const burgerActions = burgerSlice.actions

export const {
  addIngredient,
  removeIngredient,
  clearBurgerConstructor,
  swapItemsByIndex,
  clearBuns,
  clearSelectedIngredients,
} = burgerActions

export const burgerReducer = burgerSlice.reducer

export const burgerInitialState = { ...initialState }
