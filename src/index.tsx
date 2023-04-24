import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/app"
import theme from "./theme"
import reportWebVitals from "./reportWebVitals"
import { ColorModeScript } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { store } from "./services/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
