import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import { linkTheme } from "./link-theme"
import { textTheme } from "./text-theme"
import { typography } from "./typography"
import { styles } from "./styles"
import { semanticTokens } from "./styles"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const sizes = {
  container: {
    maxContentWidth:"1280px"
  }
}

const theme = extendTheme({
  config,
  ...typography,
  styles,
  semanticTokens,
  sizes,
  components: { Link: linkTheme, Text: textTheme },
})

export default theme
