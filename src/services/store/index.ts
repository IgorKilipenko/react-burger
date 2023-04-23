import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { activeModalItemReducer } from "../slices/active-modal-items"
import { burgerReducer } from "../slices/burger-constructor"
import { orderReducer } from "../slices/orders"
import { productsReducer } from "../slices/products"

const rootReducer = combineReducers({
  burgerConstructor: burgerReducer,
  orderReducer: orderReducer,
  products: productsReducer,
  activeModalItem: activeModalItemReducer
})

interface Options {
  forceDisableLogger?: boolean
}

export default function configureAppStore({ forceDisableLogger = true }: Options) {
  const isDevelopmentMode = () => process.env.NODE_ENV === "development"
  const middlewares: any[] = []
  if (isDevelopmentMode() && !forceDisableLogger) {
    const { logger } = require(`redux-logger`)

    middlewares.push(logger)
  }

  const store = configureStore({
    reducer: rootReducer,
    devTools: isDevelopmentMode(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
  })

  if (isDevelopmentMode() && module.hot) {
    module.hot.accept("./", () => store.replaceReducer(rootReducer))
  }

  return store
}

export const store = configureAppStore({ forceDisableLogger: true })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;