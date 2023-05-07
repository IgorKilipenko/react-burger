import { HomePage, NotFoundPage } from "../../pages"
import { LoginPage } from "../../pages/login"
import { ProfilePage } from "../../pages/profile"
import { RegisterPage } from "../../pages/register"
import App from "../app"
import { IngredientDetail } from "../ingredient-details"
import { Layout } from "../layouts"
import { ProtectedRoute } from "./protected-route"

const rootPath = "/"

export const routesInfo = {
  root: { path: rootPath, element: <App /> },
  layout: { element: <Layout /> },
  home: { path: rootPath, element: <HomePage /> },
  login: {
    path: "/login",
    element: <ProtectedRoute accessType="withoutAuth" element={<LoginPage />} redirectPath={rootPath} />,
  },
  register: {
    path: "/register",
    element: <ProtectedRoute accessType="withoutAuth" element={<RegisterPage />} redirectPath={rootPath} />,
  },
  forgotPassword: { path: "/forgot-password", element: null },
  resetPassword: { path: "/reset-password", element: null },
  get profile() {
    return {
      path: "/profile",
      element: <ProtectedRoute accessType="withAuth" element={<ProfilePage />} redirectPath={this.login.path} />,
    }
  },
  ingredientItem: {
    id: "ingredientItem",
    paramName: "id",
    rootPath: "ingredients",
    get path() {
      return `${this.rootPath}/:${this.paramName}`
    },
    element: <IngredientDetail />,
  },
  errorPage: { path: "/error-page", element: <NotFoundPage /> },
} as const
