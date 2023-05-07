import { apiConfig } from "./api-config"
import { apiRequest } from "./api-request"
import {
  ApiLoginResponseType,
  ApiLogoutResponseType,
  ApiRefreshTokenResponseType,
  ApiRegisterResponseType,
  ApiUserResponseType,
  TokenDataType,
  UserDataType,
  WithPassword,
} from "./api-response"

import { accessTokenStorageManager, refreshTokenStorageManager } from "./local-storage-manager"

const tokenManager = { access: accessTokenStorageManager, refresh: refreshTokenStorageManager }

export const authApi = {
  login: (userData: WithPassword<Omit<UserDataType, "name">>, options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.login}`
    return apiRequest.post<ApiLoginResponseType>({
      url,
      body: JSON.stringify(userData),
      options: { ...options, cache: "no-store" },
    })
  },

  register: (userData: WithPassword<UserDataType>, options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.register}`
    return apiRequest.post<ApiRegisterResponseType>({
      url,
      body: JSON.stringify(userData),
      options: { ...options, cache: "no-store" },
    })
  },

  refreshToken: (tokenData: TokenDataType, options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.token}`
    return apiRequest.post<ApiRefreshTokenResponseType>({
      url,
      body: JSON.stringify(tokenData),
      options: { ...options, cache: "no-store" },
    })
  },

  logout: (tokenData?: TokenDataType, options?: RequestInit) => {
    tokenData ??= { token: tokenManager.refresh.get() ?? "" }
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.logout}`

    tokenManager.access.erase()
    tokenManager.refresh.erase()

    if (tokenData.token.length === 0) {
      return Promise.resolve({ data: { success: false, message: "Token not found" } }) as ReturnType<
        typeof apiRequest.post<ApiLogoutResponseType>
      >
    }

    return apiRequest.post<ApiLogoutResponseType>({
      url,
      body: JSON.stringify(tokenData),
      options: { ...options, cache: "no-store" },
    })
  },

  getToken: async () => {
    if (tokenManager.access.get()) {
      return tokenManager.access.get()
    }
    if (!tokenManager.refresh.get()){
      return null
    }
    
    const resp = await authApi.refreshToken({ token: tokenManager.refresh.get() ?? "" })

    if (!resp.error && resp.data?.success && resp.data) {
      tokenManager.access.set(resp.data!.accessToken)
      tokenManager.refresh.set(resp.data!.refreshToken)
    }

    return resp.data?.accessToken
  },

  getUser: async (options?: RequestInit) => {
    const { headers, ...restOpts } = options ?? {}
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.user}`
    const token = await authApi.getToken()

    if (!token) {
      return Promise.resolve({ data: { success: false, message: "Token not found" } }) as ReturnType<
        typeof apiRequest.get<ApiUserResponseType>
      >
    }

    return apiRequest.get<ApiUserResponseType>({
      url,
      options: { ...restOpts, cache: "no-store", headers: { ...headers, Authorization: `Bearer ${token ?? ""}` } },
    })
  },

  updateUser: async (userData: Partial<WithPassword<UserDataType>>, options?: RequestInit) => {
    const { headers, ...restOpts } = options ?? {}
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.user}`
    const token = await authApi.getToken()
    console.assert(token)

    console.assert(Object.values(userData).some((val) => val))

    return apiRequest.post<ApiUserResponseType>({
      url,
      method: "PATH",
      body: JSON.stringify(userData),
      options: { ...restOpts, cache: "no-store", headers: { ...headers, Authorization: `Bearer ${token ?? ""}` } },
    })
  },
}
