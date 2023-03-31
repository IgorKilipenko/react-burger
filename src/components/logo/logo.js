import { Logo as LargeLogo } from "@ya.praktikum/react-developer-burger-ui-components"
import SmallLogo from "./small-logo"
import { useBreakpointValue } from "@chakra-ui/react"

const Logo = ({ type, breakpoint: bp }) => {
  const variant = useBreakpointValue({
    base: type ?? "small",
    [bp]: type ?? "large",
  })
  return variant === "large" ? <LargeLogo /> : <SmallLogo />
}

export default Logo
