import { RootState } from "../../store"
import { setAppIsLoaded, setIsBackgroundRouteMode } from "./app-state-slice"

export { appReducer } from "./app-state-slice"
export const appStateActions = { appIsLoaded: setAppIsLoaded, setIsBackgroundRouteMode }

export const getAppGlobalStore = (state: RootState) => state.app
export const getAppIsBackgroundRouteMode = (state: RootState) => state.app.isBackgroundRouteMode
