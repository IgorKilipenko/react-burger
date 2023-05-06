import { LocalStorageManager, accessTokenStorageManager, refreshTokenStorageManager } from "../../../data"

export const validateToken = (token: string, type: "access" | "refresh") => {
  const pattern = type === "access" ? /^Bearer\s+(?<token>[^\s]+)$/ : /^(?<token>[^\s]+)$/
  const match = token.match(pattern)
  return match?.groups ? match.groups["token"] : null
}

export const tokenManager = {
  saveToken: (accessToken: string, type: "access" | "refresh") => {
    const token = validateToken(accessToken, type)
    console.assert(token)
    if (!token) {
      return
    }
    const storeManager: LocalStorageManager =
      type === "access" ? accessTokenStorageManager : refreshTokenStorageManager
    storeManager.set(token)
  },
}
