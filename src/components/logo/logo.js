import { Logo as LargeLogo } from "@ya.praktikum/react-developer-burger-ui-components"
import SmallLogo from "./small-logo"
import { useBreakpointValue } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

const Logo = ({ type, breakpoint: bp }) => {
  const variant = useBreakpointValue({
    base: type ?? "small",
    [bp]: type ?? "large",
  })

  return <Box> {variant === "large" ? <LargeLogo /> : <SmallLogo />} </Box>
}

export default Logo
