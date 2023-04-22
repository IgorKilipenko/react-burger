import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { burgerReducer } from "../slices/burger-constructor/burger-slice"

const rootReducer = combineReducers({
  burgerConstructor: burgerReducer,
  
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
