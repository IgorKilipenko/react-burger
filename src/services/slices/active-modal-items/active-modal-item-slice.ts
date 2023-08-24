import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BurgerIngredientType, Order } from "../../../data"

interface ActiveModalItemState {
  activeIngredient?: BurgerIngredientType | null
  activeOrdersListItem?: Order | null
  activeOrdersFeedItem?: Order | null
}

const initialState: ActiveModalItemState = {
  activeIngredient: null,
  activeOrdersListItem: null,
  activeOrdersFeedItem: null,
}

const activeModalItemSlice = createSlice({
  name: "activeModalItem",
  initialState,
  reducers: {
    setActiveIngredient: (state, action: PayloadAction<BurgerIngredientType>) => {
      state.activeIngredient = action.payload
    },

    clearActiveIngredient: (state) => {
      state.activeIngredient = initialState.activeIngredient
    },

    setActiveOrdersListItem: (state, action: PayloadAction<Order>) => {
      state.activeOrdersListItem = action.payload
    },

    clearActiveOrdersListItem: (state) => {
      state.activeOrdersListItem = initialState.activeOrdersListItem
    },

    setActiveOrdersFeedItem: (state, action: PayloadAction<Order>) => {
      state.activeOrdersFeedItem = action.payload
    },

    clearActiveOrdersFeedItem: (state) => {
      state.activeOrdersFeedItem = initialState.activeOrdersFeedItem
    },
  },
})

export const {
  setActiveIngredient,
  clearActiveIngredient,
  setActiveOrdersListItem,
  clearActiveOrdersListItem,
  setActiveOrdersFeedItem,
  clearActiveOrdersFeedItem,
} = activeModalItemSlice.actions
export const activeModalItemReducer = activeModalItemSlice.reducer
export const activeModalItemInitialState = {...initialState}