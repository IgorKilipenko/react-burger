import React from "react"
import { Avatar, Flex, Text } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { appColors } from "../../theme/styles"
import { useOutletContext } from "react-router-dom"
import { Order, OrderStatus } from "../../data"
import { appStateActions, getAppIsBackgroundRouteMode } from "../../services/slices/app"
import { capitalizeFirstLetter } from "../../utils"
import { useGetProductsByIds } from "../../hooks"
import { Icon } from "../common"
import { CurrencyIcon } from "../common/icons"
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"

export interface OrdersListItemDetailsProps {
  maxVisibleOrderItems?: number
}

export const OrdersListItemDetails = React.memo<OrdersListItemDetailsProps>(({ maxVisibleOrderItems = 5 }) => {
  const { order } = useOutletContext<{ order: Order | undefined | null }>()
  const dispatch = useAppDispatch()
  const isBackgroundRouteMode = useAppSelector(getAppIsBackgroundRouteMode)
  const zIndexBase = 10
  const ingredients = useGetProductsByIds(order?.burgerIds ?? [])

  React.useEffect(() => {
    return () => {
      dispatch(appStateActions.setIsBackgroundRouteMode(false))
    }
  }, [dispatch])

  const orderTotalPrice = React.useMemo(() => {
    return !ingredients
      ? 0
      : Object.values(ingredients).reduce<number>((res, { element: ingredient, count }) => {
          res += ingredient.price * count
          return res
        }, 0)
  }, [ingredients])

  const buildIconsSection = React.useCallback(
    (order: Order) => {
      return ingredients ? (
        <Flex direction="column" gap={6} overflowY="auto" className="custom-scroll" maxH={`${(64 + 16) * 3}`} pr={6}>
          {Object.values(ingredients).map(({ element: ingredient, count }, i, arr) => {
            return (
              <Flex justify="stretch" align="center" gap={4}>
                <Avatar
                  key={i}
                  boxSize={16}
                  showBorder
                  borderColor={appColors.accent}
                  bg={appColors.bodyBackground}
                  zIndex={zIndexBase + arr.length - i}
                  boxShadow={"2px 0px 2px 0px #1c1c1c"}
                  name={ingredient.name}
                  src={ingredient.image}
                />
                <Flex grow={1}>
                  <Text variant="mainDefault" noOfLines={2}>
                    {ingredient.name}
                  </Text>
                </Flex>
                <Flex justify="end" align="center" gap={2} grow={1}>
                  <Text variant="digitsDefault" whiteSpace="nowrap">{`${count} x ${ingredient.price}`}</Text>
                  <Icon as={CurrencyIcon} type="primary" boxSize={6} />
                </Flex>
              </Flex>
            )
          })}
        </Flex>
      ) : null
    },
    [ingredients]
  )

  return (
    <Flex
      direction="column"
      {...(!isBackgroundRouteMode ? { w: "100%" } : { maxW: "100%", w: "640px" })}
      align="start"
      justify="center"
      flexGrow={1}
    >
      {order ? (
        <>
          <Text variant="digitsDefault" align="center" w="100%">
            {`#${order.number ?? ""}`.padStart(6, "0")}
          </Text>
          <Text variant="mainMedium" noOfLines={1} mt={10}>
            {order.name}
          </Text>
          <Flex mt={3}>
            <Text variant="mainDefault" color={order.status === OrderStatus.complete ? appColors.success : undefined}>
              {capitalizeFirstLetter(`${order.status}`)}
            </Text>
          </Flex>
          <Flex mt={15}>
            <Text variant="mainMedium">Состав:</Text>
          </Flex>
          <Flex mt={6}>{buildIconsSection(order)}</Flex>
          <Flex justify="space-between" align="center" w="100%" mt={10}>
            <Flex color={appColors.inactive}>
              <FormattedDate date={order.date ?? new Date(Date.now() - 0 * 24 * 1000 * 3600)} />
            </Flex>
            <Flex justify="end" align="center" gap={2} grow={1}>
              <Text variant="digitsDefault" whiteSpace="nowrap">{orderTotalPrice}</Text>
              <Icon as={CurrencyIcon} type="primary" boxSize={6} />
            </Flex>
          </Flex>
        </>
      ) : null}
    </Flex>
  )
})
