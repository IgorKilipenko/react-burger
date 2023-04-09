import { Flex, Text } from "@chakra-ui/react"

export interface OrderDetailsProps {
  orderId?: string | number
}

export const headerText = "Детали ингредиента"

export const OrderDetails = ({ orderId = "034536" }: OrderDetailsProps) => {
  return (
    <Flex>
      <Flex direction="column" align="center">
        <Text variant="mainDefault" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {orderId}
        </Text>
      </Flex>
    </Flex>
  )
}
