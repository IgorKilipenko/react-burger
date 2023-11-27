import { apiConfig } from "./api-config"
import { apiRequest } from "./api-request"
import type { ApiIngredientsResponseType, ApiOrderIdResponseType } from "./api-response"
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

  createOrderWithAuth: async (ingredientsIds: string[], options?: RequestInit) => {
    let withAuthOptions = {}
    try {
      withAuthOptions = await authApi.getWithAuthOptions(options)
    } catch (_) {
      return Promise.resolve({ data: { success: false, message: "Token not found" } }) as ReturnType<
        typeof apiRequest.get<ApiOrderIdResponseType>
      >
    }
    return api.createOrder(ingredientsIds, withAuthOptions)
  },

  auth: authApi,
}
