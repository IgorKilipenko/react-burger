import React from "react"
import { Square, Flex, Image, Text } from "@chakra-ui/react"
import { BurgerIngredientType } from "../../types"
import { Link } from "../link"
import { CurrencyIcon } from "../icons"
import { Icon } from "../icon"
import { Modal } from "../../modal"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"

const IngredientCard = React.memo( ({ ingredient }) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
    <Modal isOpen={modalOpen} onCloseClick={()=> setModalOpen(false)}/>
    <Link isActive={true} onClick={() => setModalOpen(true)}>
      <Flex position='relative' direction="column" align="center" _hover={{ bg: "hovered-bg" }}>
        <Image src={ingredient.image} h={120} ml={4} mr={4} mt={6} />
        <Flex gap={2} pt={1} pb={1}>
          <Text variant={"digitsDefault"} align="center">
            {ingredient.price}
          </Text>
          <Icon as={CurrencyIcon} />
        </Flex>
        <Text variant={"mainDefault"} align="center" h={12}>
          {ingredient.name}
        </Text>
        <Square position='absolute' size={8} top={0} right={0}><Counter count={1} size="default" /></Square>
      </Flex>
    </Link>
    </>
  )
})

IngredientCard.propTypes = {
  ingredient: BurgerIngredientType.isRequired,
}

export { IngredientCard }
