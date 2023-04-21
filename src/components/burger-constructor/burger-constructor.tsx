import React, { useCallback } from "react"
import { Flex, FlexProps, HTMLChakraProps, Text } from "@chakra-ui/react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { Burger } from "./burger"
import { Modal } from "../modal"
import { OrderDetails } from "../order-details"
import { useSelector } from "react-redux"
import type { BurgerItemType } from "../../services/slices/burger-constructor"
import { RootState } from "../../services/store"

export interface BurgerConstructorProps extends Omit<FlexProps, "direction" | "dir" | keyof HTMLChakraProps<"div">> {}

const BurgerConstructor = React.memo<BurgerConstructorProps>(({ ...flexOptions }) => {
  const calcTotalPrice = useCallback(
    (ingredients: BurgerItemType[]) =>
      ingredients.reduce((res, curr) => (res += curr.product.price * (curr.product.type === "bun" ? 2 : 1)), 0),
    []
  )

  const selectedIngredients = useSelector((store: RootState) => store.burgerConstructor.products)
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [modalOpen, setModalOpen] = React.useState(false)

  React.useEffect(() => {
    setTotalPrice(calcTotalPrice(selectedIngredients ?? []))
  }, [calcTotalPrice, selectedIngredients])

  const handleOrderButtonClick = React.useCallback(() => {
    setModalOpen(true)
  }, [])

  return (
    <>
      <Flex direction={"column"} gap={10} pt={100} justify="space-between" align="center" {...flexOptions}>
        <Burger />
        <Flex justify="end" align="center" w="100%" gap={10} pr={4}>
          <Flex align="center" gap={2}>
            <Text variant={"digitsMedium"}>{totalPrice}</Text>
            <Icon as={CurrencyIcon} boxSize={9} />
          </Flex>
          <Button htmlType="button" type="primary" size="large" extraClass="ml-2" onClick={handleOrderButtonClick}>
            Оформить заказ
          </Button>
        </Flex>
      </Flex>
      {modalOpen ? (
        <Modal
          headerText=""
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <OrderDetails />
        </Modal>
      ) : null}
    </>
  )
})

export default BurgerConstructor
