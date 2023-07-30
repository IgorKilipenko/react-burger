import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BurgerIngredientType, Order } from "../../../data"

interface ActiveModalItemState {
  activeIngredient?: BurgerIngredientType | null
  activeOrdersListItem?: Order | null
}

const initialState: ActiveModalItemState = {
  activeIngredient: null,
  activeOrdersListItem: null,
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
  },
})

export const {
  setActiveIngredient,
  clearActiveIngredient,
  setActiveOrdersListItem,
  clearActiveOrdersListItem,
} = activeModalItemSlice.actions
export const activeModalItemReducer = activeModalItemSlice.reducer
