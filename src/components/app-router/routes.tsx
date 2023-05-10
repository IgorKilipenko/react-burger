import { HomePage, NotFoundPage } from "../../pages"
import { ForgotPasswordPage } from "../../pages/forgot-password"
import { LoginPage } from "../../pages/login"
import { OrderPage } from "../../pages/order"
import { OrdersPage } from "../../pages/orders"
import { ProfileContainer, ProfilePage } from "../../pages/profile"
import { RegisterPage } from "../../pages/register"
import { ResetPasswordPage } from "../../pages/reset-password"
import App from "../app"
import { IngredientDetail } from "../ingredient-details"
import { Layout, ProfileLayout } from "../layouts"
import { ProtectedRoute } from "./protected-route"

const preparePath = (path: string) => {
  return path.replace(/\/{2,}/, "/")
}

export const ROOT_PATH = process.env.NODE_ENV === "development" ? "/" : "/react-burger/"
export const LOGIN = preparePath(`${ROOT_PATH}/login`)
export const REGISTER = preparePath(`${ROOT_PATH}/register`)
export const FORGOT_PASSWORD = preparePath(`${ROOT_PATH}/forgot-password`)
export const RESET_PASSWORD = preparePath(`${ROOT_PATH}/reset-password`)
export const PROFILE = preparePath(`${ROOT_PATH}/profile`)
export const ERROR_PAGE = preparePath(`${ROOT_PATH}/error-page`)
export const INGREDIENTS = preparePath(`${ROOT_PATH}/ingredients`)
export const ORDERS = preparePath(`${PROFILE}/orders`)
export const ORDER = preparePath(`${ORDERS}/:id`)

export const routesInfo = {
  root: { path: ROOT_PATH, element: <App /> },
  layout: { element: <Layout /> },
  profileContainer: { path: PROFILE, element: <ProfileContainer /> },
  profileLayout: { path: PROFILE, element: <ProfileLayout /> },
  home: { path: ROOT_PATH, element: <HomePage /> },
  login: {
    path: LOGIN,
    element: <ProtectedRoute accessType="withoutAuth" element={<LoginPage />} redirectPath={ROOT_PATH} />,
  },
  register: {
    path: REGISTER,
    element: <ProtectedRoute accessType="withoutAuth" element={<RegisterPage />} redirectPath={ROOT_PATH} />,
  },
  forgotPassword: {
    path: FORGOT_PASSWORD,
    element: <ProtectedRoute accessType="withoutAuth" element={<ForgotPasswordPage />} redirectPath={ROOT_PATH} />,
  },
  resetPassword: {
    path: RESET_PASSWORD,
    element: <ProtectedRoute accessType="withoutAuth" element={<ResetPasswordPage />} redirectPath={ROOT_PATH} />,
  },
  profile: {
      path: PROFILE,
      element: <ProtectedRoute accessType="withAuth" element={<ProfilePage />} redirectPath={LOGIN} />,
  },
  ingredientItem: {
    id: "ingredientItem",
    paramName: "id",
    rootPath: INGREDIENTS,
    get path() {
      return `${this.rootPath}/:${this.paramName}`
    },
    element: <IngredientDetail />,
  },
  orders: {
    path: ORDERS,
    element: <ProtectedRoute accessType="withAuth" element={<OrdersPage />} redirectPath={LOGIN} />,
  },
  order: {
    path: ORDER,
    element: <ProtectedRoute accessType="withAuth" element={<OrderPage />} redirectPath={LOGIN} />,
  },
  errorPage: { path: ERROR_PAGE, element: <NotFoundPage /> },
} as const
