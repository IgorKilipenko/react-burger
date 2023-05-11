import { defineStyle, createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { appColors } from "../styles"

const components = { container: "container", nav: "nav", items: "items" }
const helpers = createMultiStyleConfigHelpers([components.container, components.nav, components.items])

const sizes = {
  [components.nav]: {
    large: { maxW: "1280px" },
  },
}

const baseStyle = defineStyle({
  [components.container]: {
    bg: appColors.bodyAltBackground,
  },
})

const variants = {
  desktop: defineStyle(() => ({
    [components.container]: {
      pl: { base: 2, lg: 0 },
      pr: { base: 2, lg: 0 },
    },
    [components.nav]: {
      justify: "space-between",
      align: "center",
      w: "100%",
      pt: 4,
      pb: 4,
      ...sizes[components.nav].large,
    },
    [components.items]: {
      grow: 1,
      basis: 0,
    },
  })),

  mobile: defineStyle(() => ({
    [components.container]: {
      pl: 2,
      pr: 2,
    },
    [components.nav]: {
      justify: "space-between",
      align: "center",
      w: "100%",
      pt: 1,
      pb: 1,
    },
    [components.items]: {
      grow: 1,
      basis: 0,
    },
  })),
}

export const appHeaderTheme = helpers.defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    variant: "desktop",
  },
})
