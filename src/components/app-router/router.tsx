import { createBrowserRouter } from "react-router-dom"
import { HomePage, NotFoundPage } from "../../pages"
import App from "../app"
import { IngredientDetail } from "../ingredient-details"
import { Layout } from "../layouts"

export const routesInfo = {
  root: { path: "/", element: <App /> },
  layout: { element: <Layout /> },
  home: { path: "/", element: <HomePage /> },
  login: { path: "/login", element: null },
  register: { path: "/register", element: null },
  forgotPassword: { path: "/forgot-password", element: null },
  resetPassword: { path: "/reset-password", element: null },
  profile: { path: "/profile", element: null },
  ingredientItem: {
    path: "/ingredients/:id",
    element: <IngredientDetail />,
  },
  notfound: { path: "*", element: <NotFoundPage /> },
} as const

export const appRouter = createBrowserRouter([
  {
    path: routesInfo.root.path,
    element: routesInfo.root.element,
    children: [
      {
        element: routesInfo.layout.element,
        children: [
          {
            path: routesInfo.home.path,
            element: routesInfo.home.element,
            children: [
              { id:"ingredientItem", path: routesInfo.ingredientItem.path, element: routesInfo.ingredientItem.element },
            ],
          },
        ],
      },
      {
        ...routesInfo.notfound,
      },
    ],
  },
])
