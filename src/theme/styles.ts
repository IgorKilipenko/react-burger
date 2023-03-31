import { type ChakraTheme as ChakraThemeType } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const semanticTokens = {
  colors: {
    /*
    "chakra-body-text": { _light: "gray.800", _dark: "white" },
    "chakra-body-bg": { _light: "white", _dark: "#1c1c21" },
    "chakra-border-color": { _light: "gray.200", _dark: "whiteAlpha.300" },
    "chakra-subtle-bg": { _light: "gray.100", _dark: "gray.700" },
    "chakra-placeholder-color": { _light: "gray.500", _dark: "whiteAlpha.400" },
    */
    "link-inactive-color": { _light: "gray.800", _dark: "#8585AD" },
  },
}

export const styles: ChakraThemeType["styles"] = {
  global: (props) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "white")(props),
      bg: mode("white", "#131316")(props),
      /*transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base",*/
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
    },
  }),
}
