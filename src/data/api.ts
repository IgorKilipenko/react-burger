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

type ApiDataCache<T> = { [url: string]: { data: T; hasData: boolean } }

export interface RequestArgs<T> {
  url: string
  options?: RequestInit
  cache?: ApiDataCache<T>
  checkData?: (data: T) => Error | boolean
  onError?: (error: Error) => void
  onLoading?: () => void
  onComplete?: (data: T) => void
}

export const request = async <T = unknown>({
  url,
  options,
  cache = {},
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

  if (cache[url] && cache[url].hasData) {
    const data = cache[url].data
    onComplete && onComplete(data)
    return { data }
  }

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

    cache[url] = { data, hasData: true }
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

  getAllIngredients: () => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.ingredients}`
    return api.get<ApiIngredientsResponseType>({ url })
  },

  getOrderId: (ingredientsIds: string[]) => {
    const url = `${apiConfig.baseUrl}/${apiConfig.endpoints.orders}`
    return api.post<ApiOrderIdResponseType>({ url, body: JSON.stringify({ ingredients: ingredientsIds }) })
  },
}
