import { HomePage, NotFoundPage } from "../../pages"
import { ForgotPasswordPage } from "../../pages/forgot-password"
import { LoginPage } from "../../pages/login"
import { ProfilePage } from "../../pages/profile"
import { RegisterPage } from "../../pages/register"
import { ResetPasswordPage } from "../../pages/reset-password"
import App from "../app"
import { IngredientDetail } from "../ingredient-details"
import { Layout, ProfileContainer } from "../layouts"
import { ProtectedRoute } from "./protected-route"

export const ROOT_PATH = "/"
export const LOGIN = `${ROOT_PATH}login`
export const REGISTER = `${ROOT_PATH}register`
export const FORGOT_PASSWORD = `${ROOT_PATH}forgot-password`
export const RESET_PASSWORD = `${ROOT_PATH}reset-password`
export const PROFILE = `${ROOT_PATH}profile`
export const ERROR_PAGE = `${ROOT_PATH}error-page`
export const INGREDIENTS = `${ROOT_PATH}ingredients`

export const routesInfo = {
  root: { path: ROOT_PATH, element: <App /> },
  layout: { element: <Layout /> },
  profileLayout: { path: PROFILE, element: <ProfileContainer /> },
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
  get profile() {
    return {
      path: PROFILE,
      element: <ProtectedRoute accessType="withAuth" element={<ProfilePage />} redirectPath={this.login.path} />,
    }
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
  errorPage: { path: ERROR_PAGE, element: <NotFoundPage /> },
} as const
