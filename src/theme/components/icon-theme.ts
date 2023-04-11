import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const variants = {
  secondary: defineStyle(() => ({
    color: "link-inactive-color",
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
