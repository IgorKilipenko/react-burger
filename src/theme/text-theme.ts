import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const _fontSizes = {
  default: "16px",
  large: "36px",
  medium: "24px",
  small: "14px",
}

const sizes = {
  default: { fontSize: _fontSizes.default },
  large: { fontSize: _fontSizes.large },
  medium: { fontSize: _fontSizes.medium },
  small: { fontSize: _fontSizes.small },
}

const variants = {
  mainDefault: defineStyle(() => ({
    lineHeights: 1.5,
    fontSize: _fontSizes.default,
    fontFamily: "Jet Brains Mono",
    fontWeight: "normal",
    textDecoration: "none",
  })),

  mainLarge: defineStyle(() => ({
    fontSize: _fontSizes.large,
    fontWeight: "bold",
    lineHeight: "1.1",
  })),

  mainMedium: defineStyle(() => ({
    fontWeight: "bold",
    fontSize: _fontSizes.medium,
    lineHeight: 1.25,
  })),

  mainSmall: defineStyle(() => ({
    fontSize: _fontSizes.small,
    lineHeight: 1.43,
  })),
}

const baseStyle = defineStyle({
  variant: "mainDefault",
  padding: 0,
  margin: 0,
})

export const textTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
})
