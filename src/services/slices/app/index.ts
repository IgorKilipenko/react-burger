import { RootState } from "../../store"
import { setAppIsLoaded } from "./app-state-slice"

export { appReducer } from "./app-state-slice"
export const appStateActions = { appIsLoaded: setAppIsLoaded }

export const getAppGlobalStore = (state: RootState) => state.app
