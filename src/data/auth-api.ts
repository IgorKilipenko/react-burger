import { apiConfig } from "./api-config"
import { apiRequest } from "./api-request"
import { ApiLoginResponseType, UserDataType } from "./api-response"

export const authApi = {
  login: (
    userData:UserDataType,
    options?: RequestInit
  ) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.login}`
    return apiRequest.post<ApiLoginResponseType>({
      url,
      body: JSON.stringify(userData),
      options: { ...options, cache: "no-store" },
    })
  },
}
