import { createSlice, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import { UserDataType } from "../../../data"
import { Nullable } from "../../../utils/types"
import { login, LoginResponse, registerAsyncThunk, RegisterResponse } from "./auth-async-thunk"

interface AuthResponseState {
  user: Nullable<UserDataType>
  isAuthenticatedUser: boolean
  error?: SerializedError | null
  loading: boolean
}

const initialState: AuthResponseState = {
  user: {
    email: null,
    name: null,
  },
  isAuthenticatedUser: false,
  error: null,
  loading: false,
} as const

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state = initialState
    },
    _setUserData: (state, { payload }: PayloadAction<LoginResponse> | PayloadAction<RegisterResponse>) => {
      //!
      console.log("_setUserData")

      state.user = payload.data!.user
      state.isAuthenticatedUser = true
    },
    _setError: (state, { payload: { error } }: PayloadAction<{ error: SerializedError }>) => {
      //!
      console.log("_setError")

      authSlice.caseReducers.clearUserData(state)
      state.error = error
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      //!
      console.log("loginAsyncThunk.fulfilled")

      const { payload } = action
      console.assert(payload.data)

      authSlice.caseReducers._setUserData(state, action)
      state.loading = false
    })
    builder.addCase(login.rejected, (state, { type, error }) => {
      //!
      console.log("loginAsyncThunk.rejected")

      authSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(login.pending, (state) => {
      //!
      console.log("loginAsyncThunk.pending")

      authSlice.caseReducers.clearUserData(state)
      state.loading = true
    })

    builder.addCase(registerAsyncThunk.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
      const { payload } = action
      console.assert(payload.data)

      authSlice.caseReducers._setUserData(state, action)
      state.loading = false
    })
    builder.addCase(registerAsyncThunk.rejected, (state, { error }) => {
      authSlice.caseReducers.clearUserData(state)
      state.error = error
    })
    builder.addCase(registerAsyncThunk.pending, (state) => {
      authSlice.caseReducers.clearUserData(state)
      state.loading = true
    })
  },
})

export const authReducer = authSlice.reducer
export const { clearUserData } = authSlice.actions
