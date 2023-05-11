import { apiConfig } from "./api-config"
import { apiRequest } from "./api-request"
import { ApiIngredientsResponseType, ApiOrderIdResponseType } from "./api-response"
import { authApi } from "./auth-api"

export const api = {
  getAllIngredients: (options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.ingredients}`
    return apiRequest.get<ApiIngredientsResponseType>({ url, options: { ...options, cache: "default" } })
  },

  createOrder: (ingredientsIds: string[], options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.orders}`
    return apiRequest.post<ApiOrderIdResponseType>({
      url,
      body: JSON.stringify({ ingredients: ingredientsIds }),
      options: { ...options, cache: "no-store" },
    })
  },

  auth: authApi,
}
