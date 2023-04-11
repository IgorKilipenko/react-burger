import { defineStyle, createMultiStyleConfigHelpers } from "@chakra-ui/react"

const items = { container: "container", icon: "icon" }
const helpers = createMultiStyleConfigHelpers(["container", "icon"])

const baseStyle = defineStyle({
  [items.container]: {
    _hover: {
      cursor: "pointer",
      bg: "hovered-bg",
    },
  },
})

export const modalCloseButtonTheme = helpers.defineMultiStyleConfig({
  baseStyle,
})
