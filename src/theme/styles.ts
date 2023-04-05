import { type ChakraTheme as ChakraThemeType } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const semanticTokens = {
  colors: {
    "link-inactive-color": { _light: "gray.800", _dark: "#8585AD" },
    "app-header-bg": { _light: "white", _dark: "#1C1C21" },
    "body-bg": { _light: "white", _dark: "#131316" },
  },
}

export const styles: ChakraThemeType["styles"] = {
  global: (props) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "white")(props),
      bg: "body-bg",
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
    },
    ".constructor-element": {
      ".constructor-element__text": {
        marginRight: "20px",
        display: "-webkit-box",
        alignItems: "center",
        lineHeight: "24px",
        textAlign: "left",
        flexGrow: 1,
        overflow: "hidden",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
        textOverflow: "ellipsis",
        whiteSpace: "pre-wrap"
      },
    },
  }),
}
