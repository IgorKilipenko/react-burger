import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AppState {
  appIsLoaded: boolean
  isBackgroundRouteMode: boolean
}

export const initialState: AppState = {
  appIsLoaded: false,
  isBackgroundRouteMode: false,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppIsLoaded: (state, { payload: isLoaded }: PayloadAction<boolean>) => {
      state.appIsLoaded = isLoaded
    },
    setIsBackgroundRouteMode: (state, { payload: isBgMode }: PayloadAction<boolean>) => {
      state.isBackgroundRouteMode = isBgMode
    },
  },
})

export const appReducer = appSlice.reducer
export const { setAppIsLoaded, setIsBackgroundRouteMode } = appSlice.actions
export const appActions = appSlice.actions
export const appInitialState = initialState