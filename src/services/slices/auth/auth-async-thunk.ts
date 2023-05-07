import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, ApiLoginResponseType, UserDataType, WithoutTokens, WithPassword } from "../../../data"
import { ApiRegisterResponseType } from "../../../data/api-response"
import { tokenManager } from "./utils"

export interface LoginResponse extends Omit<Awaited<ReturnType<typeof api.auth.login>>, "data"> {
  data: WithoutTokens<ApiLoginResponseType>
}

export const login = createAsyncThunk("auth/login", async (userData: WithPassword<Omit<UserDataType, "name">>) => {
  const { data, error } = await api.auth.login(userData)

  if (error || !data || !data.success)
    throw Error(
      data?.message ?? (error?.message && error.message.length > 0 ? error.message : "Неизвестная ошибка авторизации")
    )
  console.assert(data!.accessToken.length > 0 && data!.refreshToken.length > 0)

  tokenManager.saveToken(data!.accessToken, "access")
  tokenManager.saveToken(data!.refreshToken, "refresh")

  return { data: data as WithoutTokens<ApiLoginResponseType>, error } as LoginResponse
})

export interface RegisterResponse extends Omit<Awaited<ReturnType<typeof api.auth.register>>, "data"> {
  data: WithoutTokens<ApiRegisterResponseType>
}

export const register = createAsyncThunk("auth/register", async (userData: WithPassword<UserDataType>) => {
  const { data, error } = await api.auth.register(userData)
  if (error || !data?.success) throw error ?? Error(data?.message ?? "Неизвестная ошибка регистрации")
  return { data: data as WithoutTokens<ApiLoginResponseType>, error } as LoginResponse
})
