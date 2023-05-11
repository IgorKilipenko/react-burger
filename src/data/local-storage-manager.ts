export interface LocalStorageManager {
  type: "cookie" | "localStorage"
  ssr?: boolean
  get: () => string | null
  set: (value: string) => void
  erase: () => void
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
    erase: () => {
      localStorage.removeItem(key)
    },
  }
}

const parseCookie = (cookie: string, key: string): string | null => {
  const match = cookie.match(new RegExp(`(?:^| )${key}=(?<value>[^;]+)`))
  return match?.groups?.["value"] ?? null
}

const prepareExpires = (maxAgeSec: number): string => {
  const date = new Date()
  date.setTime(date.getTime() + maxAgeSec * 1000)
  return date.toUTCString()
}

export const createCookieStorageManager = (
  key: string,
  options?: { maxAgeSec?: number; cookie?: string }
): LocalStorageManager => {
  const { maxAgeSec = 20 * 60, cookie = null } = options ?? {}
  const setWithMaxAge = (value: string | null, maxAgeSec: number) => {
    document.cookie = `${key}=${encodeURIComponent(value ?? "")}; expires=${prepareExpires(maxAgeSec)}; path=/`
  }

  return {
    ssr: !!cookie,
    type: "cookie",
    get: (): string | null => {
      if (cookie) return parseCookie(cookie, key)
      if (!globalThis?.document) return null
      return parseCookie(document.cookie, key)
    },
    set: (value) => setWithMaxAge(value, maxAgeSec),
    erase: () => {
      setWithMaxAge(null, -1)
    },
  }
}

export const accessTokenStorageManager = createCookieStorageManager("accessToken", { maxAgeSec: 20 * 60 })
export const refreshTokenStorageManager = createLocalStorageManager("refreshToken")
