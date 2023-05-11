import { RootState } from "../../store"
import { login, register, getUser, logout, updateUser } from "./auth-async-thunk"
import { clearErrors, clearState } from "./auth-slice"

import { passwordReset, passwordResetConfirm } from "./passwords-async-thunk"
import { clearErrors as clearPasswordErrors, clearState as clearPasswordState } from "./user-password-slice"

export { authReducer } from "./auth-slice"
export { userPasswordReducer } from "./user-password-slice"

export const authActions = {
  login,
  register,
  getUser,
  updateUser,
  logout,
  passwordReset,
  passwordResetConfirm,
  clearState,
  clearErrors,
  clearPasswordErrors,
  clearPasswordState
}

export const getAuthStore = (state: RootState) => state.auth
export const getCurrentUserFromStore = (state: RootState) => state.auth.user
export const getIsAuthUserFromStore = (state: RootState) => state.auth.isAuthenticatedUser
export const getPasswordStateFromStore = (state: RootState) => state.userPassword
