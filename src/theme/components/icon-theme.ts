import { defineStyle, defineStyleConfig } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const variants = {
  secondary: defineStyle(() => ({
    color: "link-inactive-color",
  })),
  error: defineStyle((props) => ({
    color: mode("#E52B1A", "#E52B1A")(props),
  })),
  success: defineStyle((props) => ({
    color: mode("#00CCCC", "#00CCCC")(props),
  })),
  primary: defineStyle((props) => ({
    color: mode("#F2F2F3", "#F2F2F3")(props),
  })),
}

const baseStyle = defineStyle({
  padding: 0,
  margin: 0,
})

export const iconTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "primary",
  },
})
