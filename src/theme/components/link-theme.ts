import { defineStyle, defineStyleConfig } from "@chakra-ui/react"
import { appColors } from "../styles"

const baseStyle = defineStyle({
  _hover: {
    textDecoration: "none",
  },
})

const variants = {
  secondary: defineStyle(() => {
    return {
      color: appColors.inactive,
    }
  }),
}

export const linkTheme = defineStyleConfig({
  baseStyle,
  variants,
})
