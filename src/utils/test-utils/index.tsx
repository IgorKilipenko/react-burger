import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { AnyAction, EmptyObject, PreloadedState, Reducer } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { AppReducer, AppReducers, AppStates, AppStore } from '../../services/store'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<AppStates>
  //store?: AppStore
  store?: ToolkitStore<EmptyObject & AppStates>
}

export const renderWithProviders = (
  reducer: {name: AppReducers, reducer: Reducer<AppStates, AnyAction>},
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({reducer: {[reducer.name as keyof AppReducer] : reducer.reducer}}),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}