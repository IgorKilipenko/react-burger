import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Icon, Icons } from "../common"
import { ErrorMessage } from "../error-message"
import { useAppSelector } from "../../services/store"
import { getOrdersStore } from "../../services/slices/orders"

export interface OrderDetailsProps {}

export const headerText = "Детали ингредиента"

export const OrderDetails: React.FC<OrderDetailsProps> = () => {
  const { order, loading, error } = useAppSelector(getOrdersStore)

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
            color={"link-inactive-color"}
          >
            Дождитесь готовности на орбитальной станции
          </Text>
        </>
      ) : loading ? (
        <Text variant="mainMedium">Обработка заказа...</Text>
      ) : (
        <ErrorMessage message={`Ошибка получения номера заказа. ${error?.code ?? ""}`} />
      )}
    </Flex>
  )
}
