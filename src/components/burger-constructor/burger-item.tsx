import React from "react"
import { Flex, Box } from "@chakra-ui/react"
import { ConstructorElement } from "./constructor-element"
import { DragIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { BurgerIngredientType } from "../../data"
import { burgerActions } from "../../services/slices/burger-constructor"
import { DndSortItem } from "../common/dnd"
import { useAppDispatch } from "../../services/store"

export const allowableTypes = { top: "top", bottom: "bottom" }
export declare type ElementType = keyof typeof allowableTypes | undefined | null

export interface BurgerItemProps {
  element: BurgerIngredientType
  uid: string
  sortIndex?: number
  type?: ElementType
  quantity?: number
}

export const BurgerItem = React.memo<BurgerItemProps>(({ element, type = null, sortIndex, uid }) => {
  const dispatch = useAppDispatch()
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
    dispatch(burgerActions.removeProductFromCart({ uid }))
  }, [dispatch, uid])

  const constructorElement = React.useMemo(() => {
    return (
      <ConstructorElement
        type={type ?? undefined}
        isLocked={isBunElement || false}
        text={element.name + (isBunElement ? ` (${type === allowableTypes.top ? "верх" : "низ"})` : "")}
        price={element.price}
        thumbnail={element.image}
        handleClose={handleRemove}
      />
    )
  }, [element.image, element.name, element.price, handleRemove, isBunElement, type])

  const dragIconElement = React.useMemo(() => {
    return (
      <Flex w={8} align="center">
        <Box w={6}>{!isBunElement && <Icon as={DragIcon} />}</Box>
      </Flex>
    )
  }, [isBunElement])

  const dndSortedConstructorElement = React.useMemo(() => {
    return React.forwardRef<HTMLDivElement, { isOver?: boolean; isDragging?: boolean }>(
      ({ isOver, isDragging }, ref) => {
        return (
          <Flex
            ref={!type ? ref : null}
            gridColumn={1}
            {...bunProps}
            w="100%"
            {...(isDragging ? { opacity: 0.5 } : {})}
          >
            {dragIconElement}
            {constructorElement}
          </Flex>
        )
      }
    )
  }, [bunProps, constructorElement, dragIconElement, type])

  const swapItems = React.useCallback(
    ({ dragIndex, hoverIndex }: { dragIndex: number; hoverIndex: number }) => {
      dispatch(burgerActions.swapItemsByIndex({ fromIdx: dragIndex, toIdx: hoverIndex }))
    },
    [dispatch]
  )

  return (
    <DndSortItem
      uid={!isBunElement ? uid : `${uid}-${type}`}
      index={sortIndex ?? -1}
      accept="burgerConstructorItems"
      moveItem={swapItems}
      target={dndSortedConstructorElement}
    />
  )
})

interface EmptyBunItemProps {
  type: NonNullable<ElementType>
}

export const EmptyBunItem = React.memo<EmptyBunItemProps>(({ type = "top" }) => {
  const element = React.useMemo(
    () =>
      ({
        name: "Булка",
        price: 0,
        image: "",
      }) as BurgerIngredientType,
    []
  )

  return <BurgerItem uid={"empty-bun-element"} type={type} element={element} />
})
