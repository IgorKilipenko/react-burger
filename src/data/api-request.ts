import { ApiResponseBase } from "./api-response"

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
      return new Error(response.statusText)
    }
    return null
  }

  onLoading && onLoading()

  let data: T | null = null
  try {
    const response = await fetch(url, options)
    const requestError = checkResponse(response)
    data = (await response.json()) as T
    if (requestError) throw requestError

    let checkDataResult: Error | boolean = true
    checkData && (checkDataResult = checkData(data))
    let error: Error | null =
      checkDataResult === true ? null : !checkDataResult ? Error("Check data failed.") : (checkDataResult as Error)
    if (error) {
      throw error
    }

    onComplete && onComplete(data)

    return { data }
  } catch (error) {
    onError && onError(error as Error)
    return { data: data ?? undefined, error: error as Error }
  }
}

export const apiRequest = {
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

  post: <TResponse extends ApiResponseBase>({
    url,
    body,
    method = "POST",
    ...rest
  }: RequestArgs<TResponse> & { body: string; method?: "POST" | "PATCH" }) => {
    const { options: externalOptions, ...other } = rest
    const { headers, ...restOpts } = externalOptions ?? {}
    return request<TResponse>({
      url,
      options: {
        cache: "default",
        mode: "cors",
        ...restOpts,
        method: method,
        body,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      },
      ...other,
    })
  },
}
