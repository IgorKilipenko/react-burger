import React, { PropsWithChildren } from "react"
import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import { configureStore } from "@reduxjs/toolkit"
import type {
  AnyAction,
  CombinedState,
  EmptyObject,
  PreloadedState,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { AppReducer, AppReducers, AppStates, AppStore } from "../../services/store"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<AppStates>
  //store?: AppStore
  //store?: ToolkitStore<EmptyObject & AppStates>
  //store?: ToolkitStore<EmptyObject & {[K in AppReducers as string] : AppStates}>
  //store?: ToolkitStore<{[K in AppReducers as string] : CombinedState<AppStates>}>
  //store?: ToolkitStore<CombinedState<Partial<{[K in keyof AppReducers] : {K: AppReducers[K]}}>>>
  store?: ToolkitStore<CombinedState<Partial<AppReducers>>>
}

export const renderWithProviders = (
  //reducer: {name: AppReducers, reducer: Reducer<AppStates, AnyAction>},
  reducer: { name: AppReducers; reducer: Reducer<AppStates, AnyAction> },
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    //store = configureStore({reducer: {[reducer.name as keyof AppReducer] : reducer.reducer}}),
    store = configureStore({ reducer: { [reducer.name as keyof AppReducer]: reducer.reducer } }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const generateRandomString = (length: number = 5) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let result = ""

  const randomValues = new Uint32Array(length)

  window.crypto.getRandomValues(randomValues)
  randomValues.forEach((value) => {
    result += characters.charAt(value % charactersLength)
  })
  return result
}
