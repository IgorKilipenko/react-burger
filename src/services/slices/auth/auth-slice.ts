import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import { api, UserDataType } from "../../../data"
import { Nullable } from "../../../utils/types"
import { tokenManager } from "./utils"

export const loginFetch = createAsyncThunk("auth/login", async (userData: UserDataType, thunkApi) => {
  thunkApi.dispatch(clearUserData())
  const { data, error } = await api.auth.login(userData)
  if (error || !data?.success) throw error ?? Error(data?.message ?? "Неизвестная ошибка авторизации")
  return { data, error }
})

type LoginResponse = Awaited<ReturnType<typeof api.auth.login>>

interface AuthResponseState {
  user: Nullable<UserDataType>
  authInfo: {
    accessToken: string | null
    refreshToken: string | null
  } | null
  isAuthenticatedUser: boolean
  error?: SerializedError | null
  loading: boolean
}

const initialState: AuthResponseState = {
  user: {
    email: null,
    name: null,
  },
  authInfo: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(loginFetch.fulfilled, (state, { payload }: PayloadAction<LoginResponse>) => {
      console.assert(payload.data)

      state.user = payload.data!.user
      tokenManager.saveToken(payload.data!.accessToken, "access")
      state.loading = false
    })
    builder.addCase(loginFetch.rejected, (state, { error }) => {
      state.user = initialState.user
      state.error = error
      state.loading = false
    })
    builder.addCase(loginFetch.pending, (state) => {
      state.error = initialState.error
      state.loading = true
    })
  },
})

export const authReducer = authSlice.reducer
export const { clearUserData } = authSlice.actions
