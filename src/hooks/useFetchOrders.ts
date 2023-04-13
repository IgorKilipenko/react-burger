import { apiClientConfig } from "../data"
import { useFetch } from "./useFetch"

export type OrderType = string

export interface ApiResponseType {
  name?: string
  order?: {
    number: number
  }
  success: boolean
  message?: string
}

export const useFetchOrders = (orders: OrderType[]): { response: ApiResponseType; loading: boolean; error?: Error } => {
  const { data, error } = useFetch<ApiResponseType>(`${apiClientConfig.baseUrl}/${apiClientConfig.endpoints.orders}`, {
    method: "POST", body: JSON.stringify(orders)
  })

  return {
    response: { name: data?.name, order: data?.order, success: data?.success ?? false },
    loading: data == null,
    error,
  }
}
