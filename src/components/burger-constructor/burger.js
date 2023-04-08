import React from "react"
import { Flex, Box } from "@chakra-ui/react"
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { DragIcon } from "../common/icons"
import { Icon } from "../common/icon"

export const Burger = React.memo(({ bun, ingredients }) => {
  const allowableTypes = { top: "top", bottom: "bottom" }
  const buildItem = ({ element, type = null }) => {
    const isBunElement = Object.values(allowableTypes).find((v) => v === type) ? true : false

    const bunProps = isBunElement
      ? {
          position: "sticky",
          alignSelf: type === allowableTypes.top ? "flex-start" : "flex-end",
          top: type === allowableTypes.top ? 0 : null,
          bottom: type === allowableTypes.bottom ? 0 : null,
          pb: type === allowableTypes.top ? "1px" : null,
          pt: type === allowableTypes.bottom ? "1px" : null,
          bg: "body-bg",
        }
      : null

    return (
      <Flex key={`bc-${element._id ?? element.name}` + (type ? `-${type}` : "")} w="100%" {...bunProps}>
        <Flex w={8} align="center">
          <Box w={6}>{!isBunElement && <Icon as={DragIcon} />}</Box>
        </Flex>
        <ConstructorElement
          type={type}
          isLocked={element.isLocked || isBunElement || false}
          text={element.name + (isBunElement ? ` (${type === allowableTypes.top ? "верх" : "низ"})` : "")}
          price={element.price}
          thumbnail={element.image}
        />
      </Flex>
    )
  }

  return (
    <Flex
      direction="column"
      justify="start"
      align="center"
      gap={4}
      maxH="100%"
      overflowY="auto"
      overflowX="hidden"
      className="custom-scroll"
      pr={4}
    >
      {bun && buildItem({ element: bun.ingredient, type: allowableTypes.top })}
      {ingredients.map((element) => buildItem({ element: element.ingredient }))}
      {bun && buildItem({ element: bun.ingredient, type: allowableTypes.bottom })}
    </Flex>
  )
})
