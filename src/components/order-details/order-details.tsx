import { Flex, Text } from "@chakra-ui/react"
import React from "react"
import { DbObjectType } from "../../data"
import { useFetchOrders } from "../../hooks"
import { Icon, Icons } from "../common"
import { ErrorMessage } from "../error-message"
import { useSelector } from "react-redux"
import { RootState } from "../../services/store"

export interface OrderDetailsProps {}

export const headerText = "Детали ингредиента"

export const OrderDetails: React.FC<OrderDetailsProps> = () => {
  const { products: cart, productQuantities } = useSelector((store: RootState) => store.burgerConstructor)
  const getIngredientsIds = React.useCallback(() => {
    return cart.reduce<DbObjectType["_id"][]>((res, item) => {
      res.push(
        ...Array(productQuantities[item.product._id])
          .fill(0)
          .map(() => item.product._id)
      )
      return res
    }, [])
  }, [cart, productQuantities])
  const { response, loading, error } = useFetchOrders(getIngredientsIds())

  return (
    <Flex direction="column" align="center" mb={20}>
      {response.success ? (
        <>
          <Text variant="digitsLarge" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {`${response.order?.number ?? ""}`.padStart(6, "0")}
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
        <ErrorMessage message={`Ошибка получения номера заказа. ${response.message ?? error ?? ""}`} />
      )}
    </Flex>
  )
}
