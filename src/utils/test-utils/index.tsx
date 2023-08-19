import React, { PropsWithChildren, Reducer } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { AnyAction, ConfigureStoreOptions, EmptyObject, PreloadedState, ReducerFromReducersMapObject, StateFromReducersMapObject } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { AppReducer, appReducers, AppReduces, AppStore, RootState } from '../../services/store'
import { FilterProps } from '../types'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<typeof appReducers[AppReduces[number]]>
  //store?: AppStore
  store?: ToolkitStore<typeof appReducers[AppReduces[number]]>
}

export const renderWithProviders =/* <S=unknown, A=unknown>*/(
  //reducer: Parameters<Reducer<unknown, unknown>>,
  reducer: Reducer<typeof appReducers[AppReduces[number]], AnyAction>,
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({reducer}),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}