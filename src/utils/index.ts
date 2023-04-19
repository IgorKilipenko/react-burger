export { capitalizeFirstLetter } from "./string-processing"

export const isBrowser = !!(typeof window !== "undefined" && window.document && window.document.createElement)
export const isTouchEnabled = isBrowser && ("ontouchstart" in window || navigator.maxTouchPoints > 0)
