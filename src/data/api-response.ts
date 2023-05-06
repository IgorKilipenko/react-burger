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

export interface UserDataType {
  email: string
  name: string
}

/**
 * Login api response type
 */
export interface ApiLoginResponseType extends ApiResponseBase {
  accessToken: string
  refreshToken: string
  user: UserDataType
}
