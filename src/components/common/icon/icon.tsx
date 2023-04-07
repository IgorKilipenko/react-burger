import React from "react"
import { Icon as ChakraIcon, Box } from "@chakra-ui/react"
import { type BoxProps as ChakraBoxProps, type IconProps as ChakraIconProps } from "@chakra-ui/react"

/*export declare type IconProps = ChakraIconProps &
  ChakraBoxProps & {
    svg: React.ElementType<any>
  }*/
/*
export const Icon = ({svg, type, children, boxSize, color, viewBox, ...otherProps} : IconProps) => (
  <Box {...otherProps}>
    <ChakraIcon as={svg} type={type} boxSize={boxSize} color={color} viewBox={viewBox}>
      {children}
    </ChakraIcon>
  </Box>
)
*/

/*
export const Icon = ({ svg, type, children, boxSize, color, viewBox, ...otherProps }: IconProps) => {
  const SvgRaw = svg
  const svgRef = React.useRef();

  React.useEffect(() => {
    console.log(svgRef)
  }, [svgRef])

  return (
    <Box {...otherProps}>
      <ChakraIcon  boxSize={boxSize} viewBox={viewBox}>
        <SvgRaw type={type} viewBox color={color}/>
      </ChakraIcon>
    </Box>
  )
}
*/

export declare type IconProps = ChakraIconProps & ChakraBoxProps & {}

export const Icon = ({ as, type, children, boxSize, color, viewBox, ...containerProps }: IconProps) => {
  const iconProps = {
    as,
    children,
    boxSize,
    color,
    viewBox,
  }
  return (
    <Box {...containerProps}>
      <ChakraIcon {...iconProps} variant={type} />
    </Box>
  )
}
