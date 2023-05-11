import { BurgerIngredientType } from "./data-types"

export type WithoutTokens<T> = Omit<T, "accessToken" | "refreshToken">
export type WithPassword<T> = Omit<T, "password"> & { password: string }

export interface UserDataType {
  email: string
  name: string
}

export interface TokenDataType {
  token: string
}

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

/**
 * Refresh token api response type
 */
export interface ApiRefreshTokenResponseType extends ApiResponseBase {
  accessToken: string
  refreshToken: string
}

/**
 * Logout api response type
 */
export interface ApiLogoutResponseType extends Required<ApiResponseBase> {}

/**
 * User info api response type
 */
export interface ApiUserResponseType extends ApiResponseBase {
  user: UserDataType
}

/**
 * User sign-in api response type
 */
export interface ApiLoginResponseType extends ApiUserResponseType, ApiRefreshTokenResponseType {}

/**
 * Reset password api response type
 */
export interface ApiPasswordResetResponseType extends Required<ApiResponseBase> {}

/**
 * Reset password confirm api response type
 */
export type ApiPasswordResetConfirmResponseType = ApiPasswordResetResponseType

/**
 * User sign-up (register) api response type
 */
export type ApiRegisterResponseType = ApiLoginResponseType

/**
 * Update user data api response type
 */
export type ApiUserUpdateResponseType = ApiUserResponseType
