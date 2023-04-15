import React from "react"
import { apiClientConfig, BurgerIngredientType, parseRawIngredientsData } from "../data"
import { useFetch } from "./useFetch"

export interface ApiResponseType {
  data?: BurgerIngredientType[]
  success: boolean
  message?: string
}

export const useFetchIngredients = () => {
  const { data, error } = useFetch<ApiResponseType>(
    `${apiClientConfig.baseUrl}/${apiClientConfig.endpoints.ingredients}`,
    { method: "GET" }
  )
  const { table: ingredients } = React.useMemo(() => {
    return parseRawIngredientsData(data?.data ?? [])
  }, [data])

  return {
    response: { ingredients, success: data?.success ?? false, message: data?.message },
    loading: data == null,
    error,
  }
}
