import { Flex, Text } from "@chakra-ui/react"
import { Icon, Icons } from "../common"

export interface OrderDetailsProps {
  orderId?: string | number
}

export const headerText = "Детали ингредиента"

export const OrderDetails = ({ orderId = "034536" }: OrderDetailsProps) => {
  return (
    <Flex direction="column" align="center" mb={20}>
      <Text variant="digitsLarge" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
        {orderId}
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
      <Text variant="mainDefault" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" color={"link-inactive-color"}>
        Дождитесь готовности на орбитальной станции
      </Text>
    </Flex>
  )
}
