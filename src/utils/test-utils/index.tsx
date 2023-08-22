export const generateRandomString = (length: number = 5) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  let result = ""

  const randomValues = new Uint32Array(length)

  window.crypto.getRandomValues(randomValues)
  randomValues.forEach((value) => {
    result += characters.charAt(value % charactersLength)
  })
  return result
}

export const testsConfig = {
  dataTestIdAttribute: "data-testid",
} as const

export interface TestId {
  [testsConfig.dataTestIdAttribute]: string
}

export type WithTestsId<T extends {}> = T & TestId
