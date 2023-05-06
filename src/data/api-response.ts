import { BurgerIngredientType } from "./data-types"

export interface ApiResponseBase {
  success: boolean
  message?: string
}

export interface ApiOrderIdResponseType extends ApiResponseBase {
  name?: string
  order?: {
    number: number
  }
}

export interface ApiIngredientsResponseType extends ApiResponseBase {
  data?: BurgerIngredientType[]
}

export type WithPassword<T> = Omit<T, "password"> & {password: string}

export interface UserDataType {
  email: string
  name: string
}

/**
 * User sign-in api response type
 */
export interface ApiLoginResponseType extends ApiResponseBase {
  accessToken: string
  refreshToken: string
  user: UserDataType
}

/**
 * User sign-up api response type
 */
export interface ApiRegisterResponseType extends ApiLoginResponseType {}
