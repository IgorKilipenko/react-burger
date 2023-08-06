import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { activeModalItemReducer } from "../slices/active-modal-items"
import { burgerReducer } from "../slices/burger-constructor"
import { orderReducer, ordersFeedActions, ordersFeedReducer, ordersListActions } from "../slices/orders"
import { ordersListReducer } from "../slices/orders"
import { productsReducer } from "../slices/products"
import { authReducer } from "../slices/auth"
import { userPasswordReducer } from "../slices/auth"
import { appReducer } from "../slices/app"
import { websocketMiddleware } from "../middlewares/ws"

const rootReducer = combineReducers({
  burgerConstructor: burgerReducer,
  orders: orderReducer,
  ordersList: ordersListReducer,
  ordersFeed: ordersFeedReducer,
  products: productsReducer,
  activeModalItem: activeModalItemReducer,
  auth: authReducer,
  userPassword: userPasswordReducer,
  app: appReducer,
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

  middlewares.push(websocketMiddleware("wss://norma.nomoreparties.space/orders", ordersListActions, true))
  middlewares.push(websocketMiddleware("wss://norma.nomoreparties.space/orders/all", ordersFeedActions, false))

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

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
