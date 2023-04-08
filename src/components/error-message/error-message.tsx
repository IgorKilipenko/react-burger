import { Flex, Text } from "@chakra-ui/react"

export interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }:ErrorMessageProps) => (
  <Flex align="center" justify="center" color='error-color'>
    <Text variant="mainLarge">{message}</Text>
  </Flex>
)
