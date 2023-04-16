import React, { StrictMode } from "react"
import { createStore, compose, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import thunk from "redux-thunk"
import App from "./components/app/app"
import "./index.css"

import { rootReducer } from "./services/reducers"

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(rootReducer, enhancer)
const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
