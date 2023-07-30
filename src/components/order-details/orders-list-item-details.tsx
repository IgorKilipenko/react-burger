import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Icon, Icons } from "../common"
import { useAppDispatch } from "../../services/store"
import { appColors } from "../../theme/styles"
import { useOutletContext } from "react-router-dom"
import { Order } from "../../data"
import { appStateActions } from "../../services/slices/app"


export interface OrdersListItemDetailsProps {}

export const OrdersListItemDetails = React.memo<OrdersListItemDetailsProps>(() => {
  const { order } = useOutletContext<{ order: Order | undefined | null }>()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    return () => {
      dispatch(appStateActions.setIsBackgroundRouteMode(false))
    }
  }, [dispatch])

  return (
    <Flex direction="column" align="center" mb={20}>
      {order ? (
        <>
          <Text variant="digitsLarge" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {`${order.number ?? ""}`.padStart(6, "0")}
          </Text>
          <Text variant="mainMedium" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" mt={8}>
            Идентификатор заказа
          </Text>
          <Flex mb={15} mt={15}>
            <Icon as={Icons.OrderSuccessIcon} />
          </Flex>
          <Text variant="mainDefault" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" mb={2}>
            Ваш заказ начали готовить
          </Text>
          <Text
            variant="mainDefault"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color={appColors.inactive}
          >
            Дождитесь готовности на орбитальной станции
          </Text>
        </>
      ) : null}
    </Flex>
  )
})
