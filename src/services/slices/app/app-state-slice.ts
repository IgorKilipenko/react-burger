import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AppState {
  appIsLoaded: boolean
}

const initialState: AppState = {
  appIsLoaded: false,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppIsLoaded: (state, { payload:isLoaded }: PayloadAction<boolean>) => {
      state.appIsLoaded = isLoaded
    },
  },
})

export const appReducer = appSlice.reducer
export const { setAppIsLoaded } = appSlice.actions
