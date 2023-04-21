import { configureStore } from "@reduxjs/toolkit"
import { burgerReducer } from "../slices/burger-constructor/burger-slice"

export const store = configureStore({
  reducer: { burgerConstructor: burgerReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
