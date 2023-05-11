import { type ChakraTheme as ChakraThemeType } from "@chakra-ui/react"

export const appColors = {
  inactive: "link-inactive-color",
  bodyAltBackground: "alt-body-bg",
  bodyBackground: "body-bg",
  elementBackground: "element-bg",
  hoveredBackground: "hovered-bg",
  textPrimary: "text-primary-color",
  accent: "accent-color",
  error: "error-color",
  success: "success-color",
  overlayBackground: "overlay-bg",
  activeBorderColor: "active-border-color",
} as const

export const semanticTokens = {
  colors: {
    [appColors.bodyBackground]: { _light: "white", _dark: "#131316" },
    [appColors.bodyAltBackground]: { _light: "gray.200", _dark: "#1C1C21" },
    [appColors.elementBackground]: { _light: "gray.200", _dark: "#2f2f37" },
    [appColors.hoveredBackground]: { _light: "gray.200", _dark: "#2f2f37" },
    [appColors.overlayBackground]: { _light: "blackAlpha.600", _dark: "blackAlpha.600" },
    [appColors.textPrimary]: { _light: "gray.800", _dark: "white" },
    [appColors.accent]: { _light: "#4C4CFF", _dark: "#4C4CFF" },
    [appColors.error]: { _light: "#E52B1A", _dark: "#E52B1A" },
    [appColors.success]: { _light: "#00CCCC", _dark: "#00CCCC" },
    [appColors.inactive]: { _light: "gray.800", _dark: "#8585AD" },
    [appColors.activeBorderColor]: { _light: "#4C4CFF", _dark: "#4C4CFF" },
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
