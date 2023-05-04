import { createBrowserRouter } from "react-router-dom"
import { HomePage, NotFoundPage } from "../../pages"
import App from "../app"
import { Layout } from "../layouts"

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])
