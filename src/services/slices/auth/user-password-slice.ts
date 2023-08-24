import { createSlice, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import {
  passwordReset,
  passwordResetConfirm,
  PasswordResetResponse,
  PasswordResetConfirmResponse,
} from "./passwords-async-thunk"

interface AuthResponseState {
  resetEmailSent: boolean
  resetConfirmed: boolean
  confirmingEmail: string | null
  error?: SerializedError | null
  loading: boolean
}

const initialState: AuthResponseState = {
  error: null,
  loading: false,
  resetEmailSent: false,
  resetConfirmed: false,
  confirmingEmail: null
} as const

const userPasswordSlice = createSlice({
  name: "auth/passwords",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = initialState.error
    },
    clearState: (state) => {
      state.resetConfirmed = initialState.resetConfirmed
      state.resetEmailSent = initialState.resetEmailSent
      userPasswordSlice.caseReducers.clearErrors(state)
      state.loading = initialState.loading
    },
    _setError: (state, { payload: { error } }: PayloadAction<{ error: SerializedError }>) => {
      userPasswordSlice.caseReducers.clearState(state)
      state.error = error
    },
  },
  extraReducers: (builder) => {
    /// Reset password
    builder.addCase(passwordReset.fulfilled, (state, { payload }: PayloadAction<PasswordResetResponse>) => {
      console.assert(payload.data)

      state.resetConfirmed = false
      state.resetEmailSent = true
      state.confirmingEmail = payload.confirmingEmail

      state.loading = false 
    })
    builder.addCase(passwordReset.rejected, (state, { type, error }) => {
      userPasswordSlice.caseReducers._setError(state, { type, payload: { error } })
    })
    builder.addCase(passwordReset.pending, (state) => {
      userPasswordSlice.caseReducers.clearErrors(state)
      state.resetConfirmed = false
      state.resetEmailSent = false
      state.loading = true
    })

    /// Confirmation
    builder.addCase(
      passwordResetConfirm.fulfilled,
      (state, { payload }: PayloadAction<PasswordResetConfirmResponse>) => {
        console.assert(payload.data)

        state.resetConfirmed = true
        state.resetEmailSent = false
        state.confirmingEmail = null

        state.loading = false
      }
    )
    builder.addCase(passwordResetConfirm.rejected, (state, { type, error }) => {
      const wasEmailSended = state.resetEmailSent
      userPasswordSlice.caseReducers._setError(state, { type, payload: { error } })
      state.resetEmailSent = wasEmailSended
    })
    builder.addCase(passwordResetConfirm.pending, (state) => {
      userPasswordSlice.caseReducers.clearErrors(state)
      state.resetConfirmed = false
      state.loading = true
    })
  },
})

export const userPasswordReducer = userPasswordSlice.reducer
export const { clearState, clearErrors } = userPasswordSlice.actions
export const userPasswordActions = { ...userPasswordSlice.actions, thunk: {passwordReset, passwordResetConfirm } }
export type UserPasswordState = typeof initialState
export const userPasswordInitialState: UserPasswordState = { ...initialState }
export type UserPasswordResetPayload = PasswordResetResponse
export type UserPasswordResetConfirmPayload = PasswordResetConfirmResponse