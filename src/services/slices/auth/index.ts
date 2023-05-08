import { RootState } from "../../store"
import { login, register, getUser, logout, passwordReset, passwordResetConfirm, updateUser } from "./auth-async-thunk"
import { clearErrors, clearPasswordResetState, clearState } from "./auth-slice"

export { authReducer } from "./auth-slice"

export const authActions = {
  login,
  register,
  getUser,
  updateUser,
  logout,
  passwordReset,
  passwordResetConfirm,
  clearPasswordResetState,
  clearState,
  clearErrors,
}

export const getAuthStore = (state: RootState) => state.auth
export const getCurrentUserFromStore = (state: RootState) => state.auth.user
export const getIsAuthUserFromStore = (state: RootState) => state.auth.isAuthenticatedUser
export const getPasswordStateFromStore = (state: RootState) => state.auth.passwordResetInfo
