import { Logo as LargeLogo } from "@ya.praktikum/react-developer-burger-ui-components"
import SmallLogo from "./small-logo"
import { useBreakpointValue } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

export interface LogoProps {
  type?: "small" | "large"
  breakpoint: string
}

const Logo = ({ type = "large", breakpoint: bp }: LogoProps) => {
  const variant = useBreakpointValue({
    base: type ?? "small",
    [bp]: type ?? "large",
  })

  return <Box> {variant === "large" ? <LargeLogo /> : <SmallLogo />} </Box>
}

export default Logo
