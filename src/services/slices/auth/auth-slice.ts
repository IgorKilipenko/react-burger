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
  passwordReset,
  passwordResetConfirm,
  PasswordResetResponse,
  PasswordResetConfirmResponse,
} from "./auth-async-thunk"

interface AuthResponseState {
  user: Nullable<UserDataType>
  isAuthenticatedUser: boolean
  error?: SerializedError | null
  loading: boolean
  passwordResetInfo: {
    resetEmailSent: boolean
    resetConfirmed: boolean
  }
}

const initialState: AuthResponseState = {
  user: {
    email: null,
    name: null,
  },
  isAuthenticatedUser: false,
  error: null,
  loading: false,
  passwordResetInfo: {
    resetEmailSent: false,
    resetConfirmed: false,
  },
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
      state.passwordResetInfo.resetConfirmed = initialState.passwordResetInfo.resetConfirmed
      state.passwordResetInfo.resetEmailSent = initialState.passwordResetInfo.resetEmailSent
    },
    clearPasswordResetState: (state) => {
      state.passwordResetInfo.resetConfirmed = initialState.passwordResetInfo.resetConfirmed
      state.passwordResetInfo.resetEmailSent = initialState.passwordResetInfo.resetEmailSent
    },
    clearErrors: (state) => {
      state.passwordResetInfo = initialState.passwordResetInfo
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
      authSlice.caseReducers.clearState(state)
      state.loading = true
    })

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

    builder.addCase(passwordReset.fulfilled, (state, { payload }: PayloadAction<PasswordResetResponse>) => {
      console.assert(payload.data)

      state.passwordResetInfo.resetConfirmed = false
      state.passwordResetInfo.resetEmailSent = true

      state.loading = false
    })
    builder.addCase(passwordReset.rejected, (state, { type, error }) => {
      authSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(passwordReset.pending, (state) => {
      authSlice.caseReducers.clearState(state)
      state.loading = true
    })

    builder.addCase(
      passwordResetConfirm.fulfilled,
      (state, { payload }: PayloadAction<PasswordResetConfirmResponse>) => {
        console.assert(payload.data)

        state.passwordResetInfo.resetConfirmed = true
        state.passwordResetInfo.resetEmailSent = false

        state.loading = false
      }
    )
    builder.addCase(passwordResetConfirm.rejected, (state, { type, error }) => {
      authSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(passwordResetConfirm.pending, (state) => {
      authSlice.caseReducers.clearState(state)
      state.loading = true
    })
  },
})

export const authReducer = authSlice.reducer
export const { clearState, clearPasswordResetState, clearErrors } = authSlice.actions
