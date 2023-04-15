import { apiClientConfig } from "../data"
import { useFetch } from "./useFetch"

export interface ApiResponseType {
  name?: string
  order?: {
    number: number
  }
  success: boolean
  message?: string
}

export const useFetchOrders = (
  ingredientsIds: string[]
): { response: ApiResponseType; loading: boolean; error?: Error } => {
  const { data, error } = useFetch<ApiResponseType>(`${apiClientConfig.baseUrl}/${apiClientConfig.endpoints.orders}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsIds }),
  })

  return {
    response: { name: data?.name, order: data?.order, success: data?.success ?? false, message: data?.message },
    loading: !error && data == null,
    error,
  } as const
}
