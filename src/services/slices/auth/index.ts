import { RootState } from "../../store"
import { login } from "./auth-async-thunk"

export { authReducer } from "./auth-slice"

export const authActions = {
  login,
}

export const getAuthStore = (state: RootState) => state.auth
