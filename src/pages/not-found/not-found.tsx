import { Flex, Text } from "@chakra-ui/react"
import React from "react"

export const NotFoundPage = React.memo(() => {
  return (
    <Flex direction="column" align="center" justify="center" grow={1} gap={10}>
      <Text variant="digitsLarge" color="error-color">
        404
      </Text>
      <Text variant="mainMedium">Страница не найдена</Text>
    </Flex>
  )
})
