import { HomePage, NotFoundPage } from "../../pages"
import { ForgotPasswordPage } from "../../pages/forgot-password"
import { LoginPage } from "../../pages/login"
import { OrdersListPage } from "../../pages/orders"
import { ProfileContainer, ProfilePage } from "../../pages/profile"
import { RegisterPage } from "../../pages/register"
import { ResetPasswordPage } from "../../pages/reset-password"
import App from "../app"
import { IngredientDetail } from "../ingredient-details"
import { Layout, ProfileLayout } from "../layouts"
import { OrdersListItemDetails } from "../order-details"
import { ProtectedRoute } from "./protected-route"

const preparePath = (path: string) => {
  return path.replace(/\/{2,}/, "/")
}

export const AppPaths = {
  ROOT_PATH: "/",
  get LOGIN() {
    return preparePath(`${AppPaths.ROOT_PATH}/login`)
  },
  get REGISTER() {
    return preparePath(`${AppPaths.ROOT_PATH}/register`)
  },
  get FORGOT_PASSWORD() {
    return preparePath(`${AppPaths.ROOT_PATH}/forgot-password`)
  },
  get RESET_PASSWORD() {
    return preparePath(`${AppPaths.ROOT_PATH}/reset-password`)
  },
  get PROFILE() {
    return preparePath(`${AppPaths.ROOT_PATH}/profile`)
  },
  get ERROR_PAGE() {
    return preparePath(`${AppPaths.ROOT_PATH}/error-page`)
  },
  get INGREDIENTS() {
    return preparePath(`${AppPaths.ROOT_PATH}/ingredients`)
  },
  get ORDERS_LIST() {
    return preparePath(`${AppPaths.PROFILE}/orders`)
  },
  get ORDERS_BOARD_ITEM() {
    return preparePath(`${AppPaths.ORDERS_LIST}/:id`)
  },
  get NOT_FOUND_PAGE() {
    return preparePath(`${AppPaths.ROOT_PATH}/*`)
  },
} as const

export const routesInfo = {
  root: { path: AppPaths.ROOT_PATH, element: <App /> },
  layout: { element: <Layout /> },
  profileContainer: { path: AppPaths.PROFILE, element: <ProfileContainer /> },
  profileLayout: { path: AppPaths.PROFILE, element: <ProfileLayout /> },
  home: { path: AppPaths.ROOT_PATH, element: <HomePage /> },
  login: {
    path: AppPaths.LOGIN,
    element: <ProtectedRoute accessType="withoutAuth" element={<LoginPage />} redirectPath={AppPaths.ROOT_PATH} />,
  },
  register: {
    path: AppPaths.REGISTER,
    element: <ProtectedRoute accessType="withoutAuth" element={<RegisterPage />} redirectPath={AppPaths.ROOT_PATH} />,
  },
  forgotPassword: {
    path: AppPaths.FORGOT_PASSWORD,
    element: (
      <ProtectedRoute accessType="withoutAuth" element={<ForgotPasswordPage />} redirectPath={AppPaths.ROOT_PATH} />
    ),
  },
  resetPassword: {
    path: AppPaths.RESET_PASSWORD,
    element: (
      <ProtectedRoute accessType="withoutAuth" element={<ResetPasswordPage />} redirectPath={AppPaths.ROOT_PATH} />
    ),
  },
  profile: {
    path: AppPaths.PROFILE,
    element: <ProtectedRoute accessType="withAuth" element={<ProfilePage />} redirectPath={AppPaths.LOGIN} />,
  },
  ingredientItem: {
    id: "ingredientItem",
    paramName: "id",
    rootPath: AppPaths.INGREDIENTS,
    get path() {
      return `${this.rootPath}/:${this.paramName}`
    },
    element: <IngredientDetail />,
  },
  ordersBoard: {
    path: AppPaths.ORDERS_LIST,
    element: <ProtectedRoute accessType="withAuth" element={<OrdersListPage />} redirectPath={AppPaths.LOGIN} />,
  },
  ordersListItem: {
    id: "ordersBoardItem",
    paramName: "id",
    rootPath: AppPaths.ORDERS_LIST,
    path: AppPaths.ORDERS_BOARD_ITEM,
    element: <ProtectedRoute accessType="withAuth" element={<OrdersListItemDetails />} redirectPath={AppPaths.LOGIN} />,
  },
  notFoundPagePage: { path: AppPaths.ERROR_PAGE, element: <NotFoundPage /> },
  errorPage: { path: AppPaths.NOT_FOUND_PAGE, element: <NotFoundPage /> },
} as const
