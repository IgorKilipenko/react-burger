import { RootState } from "../../store"
import { login, register } from "./auth-async-thunk"

export { authReducer } from "./auth-slice"

export const authActions = {
  login,
  register
}

export const getAuthStore = (state: RootState) => state.auth
