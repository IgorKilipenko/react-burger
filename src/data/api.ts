import { BurgerIngredientType } from "./data-types"

export const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space",
  endpoints: {
    orders: "api/orders",
    ingredients: "api/ingredients",
  },
}

interface State<T> {
  data?: T
  error?: Error
}

export interface RequestArgs<T> {
  url: string
  options?: RequestInit
  checkData?: (data: T) => Error | boolean
  onError?: (error: Error) => void
  onLoading?: () => void
  onComplete?: (data: T) => void
}

export const request = async <T = unknown>({
  url,
  options,
  checkData,
  onError,
  onLoading,
  onComplete,
}: RequestArgs<T>): Promise<State<T>> => {
  const checkResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
  }

  onLoading && onLoading()

  try {
    const response = await fetch(url, options)
    checkResponse(response)
    const data = (await response.json()) as T

    let checkDataResult: Error | boolean = true
    checkData && (checkDataResult = !checkData(data))
    const error = checkDataResult === true ? null : (checkDataResult as unknown as Error) ?? Error("Check data failed.")
    if (error) {
      throw error
    }

    onComplete && onComplete(data)

    return { data }
  } catch (error) {
    onError && onError(error as Error)
    return { error: error as Error }
  }
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
  ingredients?: BurgerIngredientType[]
}

export const api = {
  get: <TResponse extends ApiResponseBase>({ url, ...rest }: RequestArgs<TResponse>) => {
    const { options: externalOptions, ...other } = rest
    return request<TResponse>({
      url,
      options: {
        cache: "default",
        mode: "cors",
        ...externalOptions,
        method: "GET",
      },
      ...other,
    })
  },

  post: <TResponse extends ApiResponseBase>({ url, body, ...rest }: RequestArgs<TResponse> & { body: string }) => {
    const { options: externalOptions, ...other } = rest
    return request<TResponse>({
      url,
      options: {
        cache: "default",
        mode: "cors",
        ...externalOptions,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      },
      ...other,
    })
  },

  getAllIngredients: (options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.ingredients}`
    return api.get<ApiIngredientsResponseType>({ url, options: { ...options, cache: "default" } })
  },

  createOrder: (ingredientsIds: string[], options?: RequestInit) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.orders}`
    return api.post<ApiOrderIdResponseType>({
      url,
      body: JSON.stringify({ ingredients: ingredientsIds }),
      options: { ...options, cache: "no-store" },
    })
  },
}
