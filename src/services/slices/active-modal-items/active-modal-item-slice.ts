import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { BurgerIngredientType } from "../../../data"

interface ActiveModalItemState {
  activeIngredient?: BurgerIngredientType | null
}

const initialState: ActiveModalItemState = {
  activeIngredient: null,
}

const activeModalItemSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setActiveIngredient: (state, action: PayloadAction<BurgerIngredientType>) => {
      state.activeIngredient = action.payload
    },

    clearActiveIngredient: (state) => {
      state = initialState
    },
  },
})

export const { setActiveIngredient, clearActiveIngredient } = activeModalItemSlice.actions
export const activeModalItemReducer = activeModalItemSlice.reducer
