import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, ApiLoginResponseType, UserDataType, WithoutTokens, WithPassword } from "../../../data"

export interface LoginResponse extends Omit<Awaited<ReturnType<typeof api.auth.login>>, "data"> {
  data: WithoutTokens<ApiLoginResponseType>
}
export const login = createAsyncThunk("auth/login", async (userData: WithPassword<Omit<UserDataType, "name">>) => {
  const { data, error } = await api.auth.login(userData)

  if (error || !data || !data.success) {
    throw Error(
      data?.message ?? (error?.message && error.message.length > 0 ? error.message : "Неизвестная ошибка авторизации")
    )
  }
  console.assert(data!.accessToken.length > 0 && data!.refreshToken.length > 0)

  return { data: data as WithoutTokens<ApiLoginResponseType>, error } as LoginResponse
})

export type RegisterResponse = LoginResponse
export const register = createAsyncThunk("auth/register", async (userData: WithPassword<UserDataType>) => {
  const { data, error } = await api.auth.register(userData)

  if (error || !data || !data.success) {
    throw Error(
      data?.message ?? (error?.message && error.message.length > 0 ? error.message : "Неизвестная ошибка регистрации")
    )
  }
  console.assert(data!.accessToken.length > 0 && data!.refreshToken.length > 0)

  return { data: data as WithoutTokens<ApiLoginResponseType>, error } as RegisterResponse
})

export interface GetUserResponse extends Awaited<ReturnType<typeof api.auth.getUser>> {}
export const getUser = createAsyncThunk("auth/getUser", async () => {
  const { data, error } = await api.auth.getUser()

  if ((error || !data || !data.success) && data?.message !== "Token not found") {
    throw Error(
      data?.message ??
        (error?.message && error.message.length > 0 ? error.message : "Неизвестная ошибка запроса данных пользователя")
    )
  }

  return { data, error } as GetUserResponse
})

export interface UpdateUserResponse extends Awaited<ReturnType<typeof api.auth.updateUser>> {}
export const updateUser = createAsyncThunk("auth/updateUser", async (userData: Partial<WithPassword<UserDataType>>) => {
  const { data, error } = await api.auth.updateUser(userData)

  if ((error || !data || !data.success) && data?.message !== "Token not found") {
    throw Error(
      data?.message ??
        (error?.message && error.message.length > 0 ? error.message : "Неизвестная ошибка запроса данных пользователя")
    )
  }

  return { data, error } as UpdateUserResponse
})

export interface LogoutResponse extends Awaited<ReturnType<typeof api.auth.logout>> {}
export const logout = createAsyncThunk("auth/logout", async () => {
  const { data, error } = await api.auth.logout()

  if (error || !data || !data.success) {
    throw Error(
      data?.message ??
        (error?.message && error.message.length > 0
          ? error.message
          : "Неизвестная ошибка запроса на выход пользователя")
    )
  }

  return { data, error } as LogoutResponse
})
