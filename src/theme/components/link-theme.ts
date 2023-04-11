import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const baseStyle = defineStyle({
  _hover: {
    textDecoration: "none",
  },
})

const variants = {
  secondary: defineStyle(() => {
    return {
      color: "link-inactive-color",
    }
  }),
}

export const linkTheme = defineStyleConfig({
  baseStyle,
  variants,
})
