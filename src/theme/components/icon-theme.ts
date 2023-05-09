import { defineStyle, defineStyleConfig } from "@chakra-ui/react"
import { appColors } from "../styles"

const variants = {
  secondary: defineStyle(() => ({
    color: appColors.inactive,
  })),
  error: defineStyle(() => ({
    color: 'error-color',
  })),
  success: defineStyle(() => ({
    color: 'success-color',
  })),
  primary: defineStyle(() => ({
    color: 'inherit',
  })),
}

const baseStyle = defineStyle({
  padding: 0,
  margin: 0,
  boxSize: 6,
  viewBox: '0 0 24 24'
})

export const iconTheme = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "primary",
  },
})
