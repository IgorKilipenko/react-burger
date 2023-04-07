import { Flex, Text } from "@chakra-ui/react"

export const ModalHeader = ({text}) => (
  <Flex>
    <Text variant='mainLarge'>
      {text}
    </Text>
  </Flex>
)