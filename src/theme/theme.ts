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

const theme = extendTheme({ config, ...typography, styles, semanticTokens, components: { Link: linkTheme, Text:textTheme } })

export default theme
