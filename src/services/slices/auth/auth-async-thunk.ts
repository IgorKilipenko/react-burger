import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, ApiLoginResponseType, UserDataType, WithoutTokens, WithPassword } from "../../../data"
import { tokenManager } from "./utils"

export interface LoginResponse extends Omit<Awaited<ReturnType<typeof api.auth.login>>, "data"> {
  data: WithoutTokens<ApiLoginResponseType>
}

export const login = createAsyncThunk("auth/login", async (userData: WithPassword<Omit<UserDataType, "name">>)  => {
  const { data, error } = await api.auth.login(userData)
  if (error || !data || !data.success) throw error ?? Error(data?.message ?? "Неизвестная ошибка авторизации")
  console.assert(data!.accessToken.length > 0 && data!.refreshToken.length > 0)
  
  tokenManager.saveToken(data!.accessToken, "access")
  tokenManager.saveToken(data!.refreshToken, "refresh")

  return { data: data as WithoutTokens<ApiLoginResponseType>, error } as LoginResponse
})

export type RegisterResponse = Awaited<ReturnType<typeof api.auth.register>>

export const registerAsyncThunk = createAsyncThunk(
  "auth/register",
  async (userData: WithPassword<UserDataType>, thunkApi) => {
    const { data, error } = await api.auth.register(userData)
    if (error || !data?.success) throw error ?? Error(data?.message ?? "Неизвестная ошибка авторизации")
    return { data, error }
  }
)
