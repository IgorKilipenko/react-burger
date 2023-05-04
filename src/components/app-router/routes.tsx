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
    id: "ingredientItem",
    rootPath: "ingredients",
    get path() {return `${this.rootPath}/:id`;},
    element: <IngredientDetail />,
  },
  notfound: { path: "*", element: <NotFoundPage /> },
} as const
