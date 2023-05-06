import { apiConfig } from "./api-config"
import { apiRequest } from "./api-request"
import { ApiLoginResponseType, ApiRegisterResponseType, UserDataType, WithPassword } from "./api-response"

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
}
