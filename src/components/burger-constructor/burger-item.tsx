import React from "react"
import { Flex, Box } from "@chakra-ui/react"
import { ConstructorElement } from "./constructor-element"
import { DragIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { BurgerIngredientType } from "../../data"
import { uid as genUid } from "uid"
import { useDispatch } from "react-redux"
import { burgerActions } from "../../services/slices/burger-constructor"
import { DndSortContainer, Identifier } from "../common/dnd"

export const allowableTypes = { top: "top", bottom: "bottom" }
export declare type ElementType = keyof typeof allowableTypes | undefined | null

export interface BurgerItemProps {
  element: BurgerIngredientType
  uid: string
  sortIndex?: number
  type?: ElementType
  quantity?: number
}

export const BurgerItem: React.FC<BurgerItemProps> = ({ element, type = null, sortIndex, quantity = 1, uid }) => {
  const dispatch = useDispatch()
  const isBunElement = React.useMemo(
    () => (Object.values(allowableTypes).find((v) => v === type) ? true : false),
    [type]
  )

  const bunProps = React.useMemo(
    () =>
      isBunElement
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
        : {},
    [isBunElement, type]
  )

  const handleRemove = React.useCallback(() => {
    dispatch(burgerActions.removeProductFromCart({ id: element._id }))
  }, [dispatch, element._id])

  const dndSortedConstructorElement = React.useMemo(() => {
    return React.forwardRef<HTMLDivElement, { dataHandlerId?: Identifier | null }>(({ dataHandlerId }, ref) => (
      <Flex
        ref={!type ? ref : null}
        gridColumn={1}
        {...bunProps}
        w="100%"
        {...(dataHandlerId ? { "data-handler-id": dataHandlerId } : {})}
      >
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
    ))
  }, [bunProps, element.image, element.name, element.price, handleRemove, isBunElement, type])

  const swapItems = React.useCallback(
    ({ dragUid, hoverUid }: { dragUid: string; hoverUid: string }) => {
      dispatch(burgerActions.swapItemsByIndex({ fromUid: dragUid, toUid: hoverUid }))
    },
    [dispatch]
  )

  return (
    <DndSortContainer
      uid={`${uid}` + (type ? `-${type}` : "")}
      index={sortIndex ?? -1}
      accept="burgerConstructorItems"
      moveItem={swapItems}
      target={dndSortedConstructorElement}
    />
  )
}
