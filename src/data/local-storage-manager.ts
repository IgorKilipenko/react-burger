export interface LocalStorageManager {
  type: "cookie" | "localStorage"
  ssr?: boolean
  get: () => string | null
  set: (value: string) => void
}

export const createLocalStorageManager = (key: string): LocalStorageManager => {
  return {
    ssr: false,
    type: "localStorage",
    get: () => {
      if (!globalThis?.document) return null
      let value: string | null = null
      try {
        value = localStorage.getItem(key) ?? null
      } catch {}

      return value
    },
    set(value) {
      try {
        localStorage.setItem(key, value)
      } catch (e) {
        console.assert(false, e)
      }
    },
  }
}

const parseCookie = (cookie: string, key: string): string | null => {
  const match = cookie.match(new RegExp(`(?:^| )${key}=(?<value>[^;]+)`))
  return match?.groups?.["value"] ?? null
}

export const createCookieStorageManager = (
  key: string,
  options?: { maxAgeSec?: number; cookie?: string }
): LocalStorageManager => {
  const { maxAgeSec = 20 * 60, cookie = null } = options ?? {}
  return {
    ssr: !!cookie,
    type: "cookie",
    get: (): string | null => {
      if (cookie) return parseCookie(cookie, key)
      if (!globalThis?.document) return null
      return parseCookie(document.cookie, key)
    },
    set(value) {
      document.cookie = `${key}=${value}; max-age=${maxAgeSec}; path=/`
    },
  }
}

export const accessTokenStorageManager = createLocalStorageManager("accessToken")
export const refreshTokenStorageManager = createCookieStorageManager("refreshToken", { maxAgeSec: 20 * 60 })
