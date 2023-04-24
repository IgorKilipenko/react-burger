import { type ChakraTheme as ChakraThemeType } from "@chakra-ui/react"

export const semanticTokens = {
  colors: {
    "link-inactive-color": { _light: "gray.800", _dark: "#8585AD" },
    "alt-body-bg": { _light: "gray.200", _dark: "#1C1C21" },
    "body-bg": { _light: "white", _dark: "#131316" },
    "element-bg": { _light: "gray.200", _dark: "#2f2f37" },
    "hovered-bg": { _light: "gray.200", _dark: "#2f2f37" },
    "text-primary-color": { _light: "gray.800", _dark: "white" },
    "error-color": { _light: "#E52B1A", _dark: "#E52B1A" },
    "success-color": { _light: "#00CCCC", _dark: "#00CCCC" },
    "overlay-bg":{ _light: "blackAlpha.600", _dark: "blackAlpha.600" },
    "active-border-color" : { _light: "#4C4CFF", _dark: "#4C4CFF" },
  },
}

export const styles: ChakraThemeType["styles"] = {
  global: () => ({
    body: {
      fontFamily: "body",
      color: "text-primary-color",
      bg: "body-bg",
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
    },
  }),
}
