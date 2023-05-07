import { RootState } from "../../store"
import { login, register, getUser, logout } from "./auth-async-thunk"

export { authReducer } from "./auth-slice"

export const authActions = {
  login,
  register,
  getUser,
  logout,
}

export const getAuthStore = (state: RootState) => state.auth
export const getCurrentUserFromStore = (state: RootState) => state.auth.user
export const getIsAuthUserFromStore = (state: RootState) => state.auth.isAuthenticatedUser
