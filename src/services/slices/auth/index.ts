import { RootState } from "../../store"

export { authReducer } from "./auth-slice"

export const getUserStore = (state: RootState) => state.auth
