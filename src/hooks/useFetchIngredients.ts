import React from "react"
import { apiClientConfig, BurgerIngredientType, parseRawData } from "../data"
import { useFetch } from "./useFetch"

export interface ApiResponseType {
  data: BurgerIngredientType[]; success: boolean 
}

export const useFetchIngredients = () => {
  const { data, error } = useFetch<ApiResponseType>(
    `${apiClientConfig.baseUrl}/${apiClientConfig.endpoints.ingredients}`
  )
  const { table: ingredients, categories } = React.useMemo(() => {
    return parseRawData(data?.data ?? [])
  }, [data])

  return { data: { ingredients, categories, success: data?.success ?? false }, loading:data == null , error }
}
