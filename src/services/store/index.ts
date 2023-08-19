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
import { apiConfig } from "../../data/api-config"

const appReducers = {
  burgerConstructor: burgerReducer,
  orders: orderReducer,
  ordersList: ordersListReducer,
  ordersFeed: ordersFeedReducer,
  products: productsReducer,
  activeModalItem: activeModalItemReducer,
  auth: authReducer,
  userPassword: userPasswordReducer,
  app: appReducer,
}

const rootReducer = combineReducers({
  ...appReducers
})

interface Options {
  forceDisableLogger?: boolean
}

export const configureAppStore = ({ forceDisableLogger = true }: Options) => {
  const isDevelopmentMode = () => process.env.NODE_ENV === "development"
  const middlewares: any[] = []
  if (isDevelopmentMode() && !forceDisableLogger) {
    const { logger } = require(`redux-logger`)
    middlewares.push(logger)
  }

  middlewares.push(
    websocketMiddleware(`${apiConfig.wss.baseWssUrl}/${apiConfig.wss.endpoints.ordersList}`, ordersListActions, true)
  )
  middlewares.push(
    websocketMiddleware(`${apiConfig.wss.baseWssUrl}/${apiConfig.wss.endpoints.ordersFeed}`, ordersFeedActions, false)
  )

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
export type AppStore = ReturnType<typeof configureAppStore>
export type AppDispatch = typeof store.dispatch
export type AppReducer = typeof rootReducer
export type AppReducers = [keyof typeof appReducers]
export type AppStates = ReturnType<typeof appReducers[AppReducers[number]]>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
