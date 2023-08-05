import { apiConfig } from "./api-config"
import { apiRequest } from "./api-request"
import {
  ApiLoginResponseType,
  ApiLogoutResponseType,
  ApiPasswordResetConfirmResponseType,
  ApiPasswordResetResponseType,
  ApiRefreshTokenResponseType,
  ApiRegisterResponseType,
  ApiResponseBase,
  ApiUserResponseType,
  TokenDataType,
  UserDataType,
  WithPassword,
} from "./api-response"
import { tokenManager } from "./utils"

export const authApi = {
  login: async (userData: WithPassword<Omit<UserDataType, "name">>, options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.login}`

    const result = await apiRequest.post<ApiLoginResponseType>({
      url,
      body: JSON.stringify(userData),
      options: { ...options, cache: "no-store" },
    })

    if (!result.error && result.data?.success) {
      tokenManager.setAccess(result.data.accessToken)
      tokenManager.setRefresh(result.data.refreshToken)
    }

    return result
  },

  register: async (userData: WithPassword<UserDataType>, options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.register}`
    const result = await apiRequest.post<ApiRegisterResponseType>({
      url,
      body: JSON.stringify(userData),
      options: { ...options, cache: "no-store" },
    })

    if (!result.error && result.data?.success) {
      tokenManager.setAccess(result.data.accessToken)
      tokenManager.setRefresh(result.data.refreshToken)
    }

    return result
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
    tokenData ??= { token: tokenManager.getRefresh() ?? "" }
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.logout}`

    tokenManager.eraseAccess()
    tokenManager.eraseRefresh()

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

  getToken: async (withoutRefresh = false) => {
    if (!withoutRefresh && tokenManager.getAccess()) {
      return tokenManager.getAccess()
    }
    if (!tokenManager.getRefresh()) {
      return null
    }

    const resp = await authApi.refreshToken({ token: tokenManager.getRefresh() ?? "" })

    if (!resp.error && resp.data?.success) {
      tokenManager.setAccess(resp.data!.accessToken)
      tokenManager.setRefresh(resp.data!.refreshToken)
    }

    return tokenManager.getAccess()
  },

  getUser: async (
    options?: RequestInit,
    eraseToken = false
  ): Promise<ReturnType<typeof apiRequest.get<ApiUserResponseType>>> => {
    const { headers, ...restOpts } = options ?? {}
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.user}`

    eraseToken && tokenManager.eraseAccess()
    const token = await authApi.getToken(eraseToken)

    if (!token) {
      return Promise.resolve({ data: { success: false, message: "Token not found" } }) as ReturnType<
        typeof apiRequest.get<ApiUserResponseType>
      >
    }

    console.assert(!token.match(/^Bearer\s+/g))
    const result = await apiRequest.get<ApiUserResponseType>({
      url,
      options: { ...restOpts, cache: "no-store", headers: { ...headers, Authorization: `Bearer ${token ?? ""}` } },
    })

    if (
      !eraseToken &&
      !result.data?.success &&
      (result.data?.message === "jwt expired" || result.data?.message === "jwt malformed") &&
      tokenManager.getAccess() &&
      tokenManager.getRefresh()
    ) {
      tokenManager.eraseAccess()
      return authApi.getUser(options, true)
    }

    return result
  },

  updateUser: async (userData: Partial<WithPassword<UserDataType>>, options?: RequestInit) => {
    const { headers, ...restOpts } = options ?? {}
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.user}`
    const token = await authApi.getToken()

    if (!token) {
      return Promise.resolve({ data: { success: false, message: "Token not found" } }) as ReturnType<
        typeof apiRequest.get<ApiUserResponseType>
      >
    }

    console.assert(Object.values(userData).some((val) => val))
    console.assert(!token.match(/^Bearer\s+/g))

    return apiRequest.post<ApiUserResponseType>({
      url,
      method: "PATCH",
      body: JSON.stringify(userData),
      options: { ...restOpts, cache: "no-store", headers: { ...headers, Authorization: `Bearer ${token ?? ""}` } },
    })
  },

  passwordReset: (emailData: Omit<UserDataType, "name">, options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.passwordReset}`
    return apiRequest.post<ApiPasswordResetResponseType>({
      url,
      body: JSON.stringify(emailData),
      options: { ...options, cache: "no-store" },
      checkData: (data: ApiPasswordResetConfirmResponseType) => {
        if (data.success && data.message !== "Reset email sent") {
          return new Error("Password reset confirm failed")
        }
        return true
      },
    })
  },

  passwordResetConfirm: async (confirmData: WithPassword<TokenDataType>, options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.passwordResetConfirm}`

    return apiRequest.post<ApiPasswordResetConfirmResponseType>({
      url,
      body: JSON.stringify(confirmData),
      options: { ...options, cache: "no-store" },
      checkData: (data: ApiPasswordResetConfirmResponseType) => {
        if (data.success && data.message !== "Password successfully reset") {
          return new Error("Password reset confirm failed")
        }
        return true
      },
    })
  },

  getWithAuthOptions: async (options?: RequestInit): Promise<RequestInit> => {
    const token = await authApi.getToken(false)
    if (!token) {
      return Promise.reject(new Error("Invalid token"))
    }

    const { headers } = options ?? {}

    return Promise.resolve({ ...options, headers: { ...headers, Authorization: `Bearer ${token}` } })
  },
}
