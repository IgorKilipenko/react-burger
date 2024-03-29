import React from "react"
import { Flex, Image, Text } from "@chakra-ui/react"
import { Icon } from "../common"
import { LockIcon, DeleteIcon, CurrencyIcon } from "../common/icons"
import { OmitFlexOptions } from "../../utils/types"
import { appColors } from "../../theme/styles"

export interface ContainerOptions extends OmitFlexOptions<"direction"> {}

export interface ConstructorElementOptions {
  container?: ContainerOptions
}

export interface ConstructorElementProps {
  text: string
  thumbnail: string
  price: number
  type?: "top" | "bottom" | "default"
  isLocked?: boolean
  handleClose?: () => void
  options?: ConstructorElementOptions
}

export const ConstructorElement: React.FC<ConstructorElementProps> = ({
  type = "default",
  text,
  thumbnail,
  price,
  isLocked,
  options,
  handleClose,
}) => {
  const action = React.useMemo(
    () =>
      isLocked ? (
        <Icon as={LockIcon} type="secondary" />
      ) : (
        <Icon as={DeleteIcon} type="primary" cursor="pointer" {...(handleClose ? { onClick: handleClose } : {})} />
      ),
    [handleClose, isLocked]
  )

  const isEmpty = React.useMemo(() => {
    return !thumbnail || thumbnail === ""
  }, [thumbnail])

  const borderRadius = {
    default: { borderRadius: "40px" },
    top: { borderTopLeftRadius: "88px", borderTopRightRadius: "88px" },
    bottom: { borderBottomLeftRadius: "88px", borderBottomRightRadius: "88px" },
  }

  const mainGaps = 5

  return (
    <Flex
      justify="stretch"
      align="center"
      bg="element-bg"
      maxW="536px"
      minH="80px"
      gap={mainGaps}
      pt={4}
      pb={4}
      pr={8}
      pl={6}
      grow={1}
      {...{ ...borderRadius["default"], ...borderRadius[type] }}
      {...options?.container}
    >
      {!isEmpty ? (
        <>
          <Flex grow={1} align="center" gap={mainGaps}>
            <Image src={thumbnail} alt={text} w="80px" h="50px" />
            <Text textAlign="start" noOfLines={2} variant="mainDefault">
              {text}
            </Text>
          </Flex>
          <Flex align="center" gap={mainGaps}>
            <Flex align="center" gap={2}>
              <Text variant="digitsDefault">{price}</Text>
              <Icon as={CurrencyIcon} type="primary" />
            </Flex>
            {action}
          </Flex>
        </>
      ) : (
        <Text minW={"md"} textAlign="center" color={appColors.inactive} noOfLines={2} variant="mainDefault">
          {text}
        </Text>
      )}
    </Flex>
  )
}
