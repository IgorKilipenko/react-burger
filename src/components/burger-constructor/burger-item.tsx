import React from "react"
import { Flex, Box } from "@chakra-ui/react"
import { ConstructorElement } from "./constructor-element"
import { DragIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { BurgerIngredientType } from "../../data"
import { uid } from "uid"
import { useDispatch } from "react-redux"
import { burgerActions } from "../../services/slices/burger-constructor"

export const allowableTypes = { top: "top", bottom: "bottom" }
export declare type ElementType = keyof typeof allowableTypes | undefined | null

export interface BurgerItemProps {
  element: BurgerIngredientType
  type?: ElementType
  quantity?: number
}

export const BurgerItem: React.FC<BurgerItemProps> = ({ element, type = null, quantity = 1 }) => {
  const dispatch = useDispatch()
  const isBunElement = Object.values(allowableTypes).find((v) => v === type) ? true : false

  const bunProps = isBunElement
    ? {
        ...{
          position: "sticky",
          alignSelf: type === allowableTypes.top ? "flex-start" : "flex-end",
          top: type === allowableTypes.top ? 0 : null,
          bottom: type === allowableTypes.bottom ? 0 : null,
          pb: type === allowableTypes.top ? "1px" : null,
          pt: type === allowableTypes.bottom ? "1px" : null,
          bg: "body-bg",
        },
      }
    : {}

  const handleRemove = React.useCallback(() => {
    dispatch(burgerActions.removeProductFromCart({ id: element._id }))
  }, [dispatch, element._id])

  return (
    <>
      {Array(quantity)
        .fill(0)
        .map(() => (
          <Flex key={`bi-${element._id}-${uid()}` + (type ? `-${type}` : "")} gridColumn={1} {...bunProps} w="100%">
            <Flex w={8} align="center">
              <Box w={6}>{!isBunElement && <Icon as={DragIcon} />}</Box>
            </Flex>
            <ConstructorElement
              type={type ?? undefined}
              isLocked={isBunElement || false}
              text={element.name + (isBunElement ? ` (${type === allowableTypes.top ? "верх" : "низ"})` : "")}
              price={element.price}
              thumbnail={element.image}
              handleClose={handleRemove}
            />
          </Flex>
        ))}
    </>
  )
}
