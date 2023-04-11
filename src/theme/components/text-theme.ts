import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const _digitsFontFamily = "Iceland"

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
    lineHeight: 1.5,
    fontSize: _fontSizes.default,
    fontFamily: "Jet Brains Mono",
    fontWeight: "normal",
    textDecoration: "none",
    color: 'inherit',
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

  digitsMedium: {
    fontFamily: _digitsFontFamily,
    fontSize: "48px",
    lineHeight: 0.75,
  },
  digitsDefault: {
    fontFamily: _digitsFontFamily,
    fontSize: "28px",
    lineHeight: 0.86,
    color: 'inherit',
  },
  digitsLarge: {
    fontFamily: _digitsFontFamily,
    fontSize: "144px",
    lineHeight: 0.83,
  },
}

const baseStyle = defineStyle({
  padding: 0,
  margin: 0,
})

export const textTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    variant: "mainDefault",
  },
})
