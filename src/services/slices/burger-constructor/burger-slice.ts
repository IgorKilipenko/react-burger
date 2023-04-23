import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { allowableCategories, BurgerIngredientType, DbObjectType, IngredientBase } from "../../../data"
import { uid } from "uid"

type ProductBase = DbObjectType & IngredientBase
type ProductIdType = ProductBase["_id"]

export interface OrderedItemType {
  uid: string
}

export type QuantitiesRecord<T extends ProductIdType> = Record<T, number>

interface BurgerItemBase<T extends ProductBase> extends Partial<OrderedItemType> {
  product: T
  bun?: T
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

const getProductsByType = <T extends ProductBase>(
  type: ProductBase["type"],
  products: BurgerStateBase<T>["products"]
) => {
  return products.filter((item) => item.product.type === type)
}

const burgerSlice = createSlice({
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
      let { product, quantity = 1 } = action.payload
      console.assert(quantity > 0)

      if (product.type === allowableCategories.bun) {
        burgerSlice.caseReducers.clearBuns(state)
        quantity = quantity > 1 ? 1 : quantity
      }

      Array(quantity)
        .fill(0)
        .forEach((_, i) =>
          state.products[product.type === allowableCategories.bun ? "unshift" : "push"]({
            product,
            uid: uid(),
          })
        )

      state.productQuantities[product._id] =
        product.type === allowableCategories.bun ? 1 : (state.productQuantities[product._id] ?? 0) + quantity
    },

    removeIngredient: (state, action: PayloadAction<{ id: ProductIdType } | { uid: OrderedItemType["uid"] }>) => {
      const id = "id" in action.payload ? action.payload.id : null
      const uid = "uid" in action.payload ? action.payload.uid : null

      console.assert(id || uid)
      if (!uid) {
        console.assert(id && (state.productQuantities[id] ?? 0 <= 1))
      }

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

    swapItemsByIndex: (
      state,
      action: PayloadAction<{
        fromIdx: number
        toIdx: number
      }>
    ) => {
      let { fromIdx, toIdx } = action.payload

      if (fromIdx === toIdx) return

      fromIdx++
      toIdx++
      console.assert(fromIdx > 0 && toIdx > 0 && fromIdx < state.products.length && toIdx < state.products.length)

      const buff = { ...state.products[fromIdx], sortIndex: toIdx }
      state.products[fromIdx] = { ...state.products[toIdx] }
      state.products[toIdx] = buff
    },
  },
})

export const { addIngredient, removeIngredient, clearBurgerConstructor, swapItemsByIndex, clearBuns } =
  burgerSlice.actions
export const burgerReducer = burgerSlice.reducer
