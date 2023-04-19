import React from "react"
import { Square, Flex, Image, Text } from "@chakra-ui/react"
import { Link } from "../link"
import { CurrencyIcon } from "../icons"
import { Icon } from "../icon"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"

export interface CardProps {
  name: string
  image: string
  price: number
  count?: number
  onClick?: () => void
}

export const Card = ({ name, image, price, count = 0, onClick }: CardProps) => {
  const handleItemClick = () => {
    onClick && onClick()
  }

  return (
    <Link isActive={true} onClick={handleItemClick}>
      <Flex position="relative" direction="column" align="center" _hover={{ bg: "hovered-bg" }}>
        <Image src={image} h={120} ml={4} mr={4} mt={6} />
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
          <Square position="absolute" size={8} top={0} right={0}>
            <Counter count={count} size="default" />
          </Square>
        )}
      </Flex>
    </Link>
  )
}
