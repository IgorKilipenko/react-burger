import { createSlice, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import { UserDataType } from "../../../data"
import { Nullable } from "../../../utils/types"
import {
  getUser,
  GetUserResponse,
  login,
  LoginResponse,
  logout,
  LogoutResponse,
  register,
  RegisterResponse,
  updateUser,
  UpdateUserResponse,
} from "./auth-async-thunk"

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
    clearState: (state) => {
      state.error = initialState.error
      state.loading = initialState.loading
      state.user = initialState.user
      state.isAuthenticatedUser = initialState.isAuthenticatedUser
    },
    clearErrors: (state) => {
      state.error = initialState.error
    },
    _setUserData: (
      state,
      { payload }: PayloadAction<LoginResponse> | PayloadAction<RegisterResponse> | PayloadAction<GetUserResponse>
    ) => {
      state.user = payload.data!.user
      state.isAuthenticatedUser = true
    },
    _setError: (state, { payload: { error } }: PayloadAction<{ error: SerializedError }>) => {
      authSlice.caseReducers.clearState(state)
      state.error = error
    },
  },

  extraReducers: (builder) => {
    /// Sign-in
    builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      const { payload } = action
      console.assert(payload.data)

      authSlice.caseReducers._setUserData(state, action)
      state.loading = false
    })
    builder.addCase(login.rejected, (state, { type, error }) => {
      authSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(login.pending, (state) => {
      state.loading = true
    })

    /// Register user
    builder.addCase(register.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
      const { payload } = action
      console.assert(payload.data)

      authSlice.caseReducers._setUserData(state, action)
      state.loading = false
    })
    builder.addCase(register.rejected, (state, { type, error }) => {
      authSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(register.pending, (state) => {
      authSlice.caseReducers.clearState(state)
      state.loading = true
    })

    /// Try get current user data by token
    builder.addCase(getUser.fulfilled, (state, { type, payload }: PayloadAction<GetUserResponse>) => {
      console.assert(payload.data)

      !payload.error && payload.data && payload.data.success
        ? authSlice.caseReducers._setUserData(state, { type, payload })
        : authSlice.caseReducers.clearState(state)
      state.loading = false
    })
    builder.addCase(getUser.rejected, (state, { type, error }) => {
      if (error.message !== "jwt malformed") {
        authSlice.caseReducers._setError(state, { type, payload: { error } })
      } else {
        state.loading = false
      }
    })
    builder.addCase(getUser.pending, (state) => {
      authSlice.caseReducers.clearState(state)
      state.loading = true
    })

    /// Update user data
    builder.addCase(updateUser.fulfilled, (state, { type, payload }: PayloadAction<UpdateUserResponse>) => {
      console.assert(payload.data)

      authSlice.caseReducers._setUserData(state, { type, payload })
      state.loading = false
    })
    builder.addCase(updateUser.rejected, (state, { type, error }) => {
      authSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(updateUser.pending, (state) => {
      authSlice.caseReducers.clearState(state)
      state.loading = true
    })

    /// Logout
    builder.addCase(logout.fulfilled, (state, { payload }: PayloadAction<LogoutResponse>) => {
      console.assert(payload.data)

      authSlice.caseReducers.clearState(state)
    })
    builder.addCase(logout.rejected, (state, { type, error }) => {
      authSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = true
    })
  },
})

export const authReducer = authSlice.reducer
export const { clearState, clearErrors } = authSlice.actions
export const authActions = { ...authSlice.actions, thunk: { login, register, getUser, updateUser, logout } }
export type AuthState = typeof initialState
export const authInitialState: AuthState = { ...initialState }
export type RegisterPayload = RegisterResponse
export type LoginPayload = LoginResponse
export type GetUserPayload = GetUserResponse
export type UpdateUserPayload = UpdateUserResponse
export type LogoutPayload = LogoutResponse