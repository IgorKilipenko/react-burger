import { defineStyle, defineStyleConfig } from "@chakra-ui/react"
//import { mode } from "@chakra-ui/theme-tools"

const baseStyle = defineStyle({
  /*transitionProperty: 'common',
  transitionDuration: 'fast',
  transitionTimingFunction: 'ease-out',
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 'none',
  color: 'inherit',*/
  _hover: {
    textDecoration: "none",
  },
  /*_focusVisible: {
    boxShadow: 'outline',
  },*/
})

const variantLink = defineStyle((/*props*/) => {
  //const { colorScheme: c } = props
  return {
    /*padding: 0,
    height: "auto",
    lineHeight: "normal",
    verticalAlign: "baseline",
    color: mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: "underline",
      _disabled: {
        textDecoration: "none",
      },
    },*/
    //_hover: {
    //color: mode(`${c}.700`, `${c}.500`)(props),
    //color: '#8585AD'
    //},
    //color: mode(`${c}.700`, '#8585AD')(props)
    /*_dark: {
      color:'#8585AD'
    }*/
    color: "link-inactive-color",
  }
})

const variants = {
  primary: variantLink,
}

export const linkTheme = defineStyleConfig({
  baseStyle,
  variants,
})
