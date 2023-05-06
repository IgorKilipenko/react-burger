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
      throw new Error(response.statusText)
    }
  }

  onLoading && onLoading()

  try {
    const response = await fetch(url, options)
    checkResponse(response)
    const data = (await response.json()) as T

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
    return { error: error as Error }
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
}
