import React from "react"
import { Square, Flex, Image, Text } from "@chakra-ui/react"
import { Link } from "../link"
import { CurrencyIcon } from "../icons"
import { Icon } from "../icon"
import { Modal } from "../../modal"
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { type BurgerIngredientType } from "../../../data"
import { IngredientDetail, headerText } from "../../ingredient-detail"

export interface IngredientCardProps {
  ingredient: BurgerIngredientType
  selectedCount?: number
}

const IngredientCard = React.memo(({ ingredient, selectedCount = 0 }: IngredientCardProps) => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <>
      <Modal
        headerText={headerText}
        isOpen={modalOpen}
        onCloseClick={() => {
          setModalOpen(false)
        }}
      >
        <IngredientDetail ingredient={ingredient}/>
      </Modal>
      <Link isActive={true} onClick={() => setModalOpen(true)}>
        <Flex position="relative" direction="column" align="center" _hover={{ bg: "hovered-bg" }}>
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
          {selectedCount > 0 && (
            <Square position="absolute" size={8} top={0} right={0}>
              <Counter count={selectedCount} size="default" />
            </Square>
          )}
        </Flex>
      </Link>
    </>
  )
})

export { IngredientCard }
