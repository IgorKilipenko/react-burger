import { LocalStorageManager, accessTokenStorageManager, refreshTokenStorageManager } from "."

export const prepareToken = (token: string, type: "access" | "refresh") => {
  const pattern = type === "access" ? /^Bearer\s+(?<token>[^\s]+)$/ : /^(?<token>[^\s]+)$/
  const match = token.match(pattern)
  return match?.groups ? match.groups["token"] : null
}

export const tokenManager = {
  set: (accessToken: string, type: "access" | "refresh") => {
    const token = prepareToken(accessToken, type)
    console.assert(token)
    if (!token) {
      return
    }
    const storeManager: LocalStorageManager = type === "access" ? accessTokenStorageManager : refreshTokenStorageManager
    storeManager.set(token)
  },
  setAccess: (token: string) => tokenManager.set(token, "access"),
  setRefresh: (token: string) => tokenManager.set(token, "refresh"),

  get: (type: "access" | "refresh") => {
    const storeManager: LocalStorageManager = type === "access" ? accessTokenStorageManager : refreshTokenStorageManager
    return storeManager.get()
  },
  getAccess: () => tokenManager.get("access"),
  getRefresh: () => tokenManager.get("refresh"),

  erase: (type: "access" | "refresh") => {
    const storeManager: LocalStorageManager = type === "access" ? accessTokenStorageManager : refreshTokenStorageManager
    storeManager.erase()
  },
  eraseAccess: () => tokenManager.erase("access"),
  eraseRefresh: () => tokenManager.erase("refresh"),
}
