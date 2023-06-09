import { Flex, Text } from "@chakra-ui/react"

export interface ModalHeaderProps {
  text?: string
}

export const ModalHeader = ({ text }: ModalHeaderProps) => (
  <Flex>
    <Text noOfLines={2} variant="mainLarge">{text}</Text>
  </Flex>
)
