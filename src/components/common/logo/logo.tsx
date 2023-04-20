import { Logo as LargeLogo } from "@ya.praktikum/react-developer-burger-ui-components"
import SmallLogo from "./small-logo"
import { useBreakpointValue } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"

export interface LogoProps {
  type?: "small" | "large"
  breakpoint: string
}

const Logo = ({ type, breakpoint: bp }: LogoProps) => {
  const variant = useBreakpointValue(
    {
      base: "small",
      [bp]: type ?? "large",
    },
    type ?? "large"
  )

  return <Box> {variant === "large" ? <LargeLogo /> : <SmallLogo />} </Box>
}

export default Logo
