import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import { linkTheme } from "./components/link-theme"
import { iconTheme } from "./components/icon-theme"
import { appHeaderTheme } from "./components/app-header-theme"
import { modalCloseButtonTheme } from './components/modal/modal-close-button-theme'
import { textTheme } from "./components/text-theme"
import { typography } from "./foundations/typography"
import { styles } from "./styles"
import { semanticTokens } from "./styles"
import { spacing } from "./foundations/spacing"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const sizes = {
  container: {
    maxContentWidth: "1280px",
  },
}

const theme = extendTheme({
  config,
  ...typography,
  styles,
  semanticTokens,
  sizes,
  ...spacing,
  components: { Link: linkTheme, Text: textTheme, ModalCloseButton: modalCloseButtonTheme, Icon:iconTheme, AppHeader:appHeaderTheme },
})

export default theme
