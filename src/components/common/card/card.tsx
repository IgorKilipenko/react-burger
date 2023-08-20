import React from "react"
import { Square, Flex, Image, Text } from "@chakra-ui/react"
import type { ImageProps } from "@chakra-ui/react"
import { Link } from "../link"
import { CurrencyIcon } from "../icons"
import { Icon } from "../icon"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { OmitFlexOptions, TestId, WithTestsId } from "../../../utils/types"

export interface CardContainerOptions extends OmitFlexOptions<"direction"> {}
export interface CardImageOptions extends ImageProps {}
export interface CardOptions {
  containerProps?: CardContainerOptions
  imageProps?: CardImageOptions
}

export interface CardProps extends Partial<TestId> {
  name: string
  image: string
  price: number
  count?: number
  options?: CardOptions
  onClick?: () => void
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ name, image, price, count = 0, options, onClick, dataTestid }, ref) => {
    const handleItemClick = () => {
      onClick && onClick()
    }

    const { containerProps, imageProps } = options ?? {}

    return (
      <Link ref={ref} isActive={true} onClick={handleItemClick} {...(dataTestid ? { dataTestid } : null)}>
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
