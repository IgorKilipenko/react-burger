import { defineStyle, createMultiStyleConfigHelpers } from "@chakra-ui/react"

const items = { container: "container", icon: "icon" }
const helpers = createMultiStyleConfigHelpers(["container", "icon"])

const baseStyle = defineStyle({
  [items.container]: {
    _hover: {
      cursor: "pointer"
    }
  },
  [items.icon]: {
    _hover: {
      bg: "red.300",
      transform: "rotate(90deg)",
    },
  },
})

export const modalCloseButtonTheme = helpers.defineMultiStyleConfig({
  baseStyle,
})
