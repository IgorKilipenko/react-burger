import { Flex, Text } from "@chakra-ui/react"

export const NotFoundPage = () => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%" h="100%" gap={10}>
      <Text variant="digitsLarge" color="error-color">
        404
      </Text>
      <Text variant="mainMedium">Страница не найдена</Text>
    </Flex>
  )
}
