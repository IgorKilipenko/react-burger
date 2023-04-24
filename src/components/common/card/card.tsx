import React from "react"
import { Square, Flex, Image, Text } from "@chakra-ui/react"
import type { ImageProps, FlexProps, HTMLChakraProps } from "@chakra-ui/react"
import { Link } from "../link"
import { CurrencyIcon } from "../icons"
import { Icon } from "../icon"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"

export interface CardContainerProps extends Omit<FlexProps, "direction" | "dir" | keyof HTMLChakraProps<"div">> {}
export interface CardImageProps extends ImageProps {}
export interface CardOptions {
  containerProps?: CardContainerProps
  imageProps?: CardImageProps
}

export interface CardProps {
  name: string
  image: string
  price: number
  count?: number
  options?: CardOptions
  onClick?: () => void
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ name, image, price, count = 0, options, onClick }, ref) => {
    const handleItemClick = () => {
      onClick && onClick()
    }

    const { containerProps, imageProps } = options ?? {}

    return (
      <Link ref={ref} isActive={true} onClick={handleItemClick}>
        <Flex
          position="relative"
          direction="column"
          align="center"
          _hover={{ bg: "hovered-bg" }}
          {...(containerProps ? containerProps : {})}
        >
          <Image src={image} ml={4} mr={4} mt={6} {...(imageProps ? imageProps : {})} />
          <Flex gap={2} pt={1} pb={1}>
            <Text variant={"digitsDefault"} align="center">
              {price}
            </Text>
            <Icon as={CurrencyIcon} />
          </Flex>
          <Text variant={"mainDefault"} align="center" h={12}>
            {name}
          </Text>
          {count > 0 && (
            <Square position="absolute" size={8} m={1} top={0} right={0}>
              <Counter count={count} size="default" />
            </Square>
          )}
        </Flex>
      </Link>
    )
  }
)
