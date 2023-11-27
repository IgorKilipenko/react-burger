import React, { useCallback } from "react"
import {type FlexProps, type HTMLChakraProps, Flex, Text} from "@chakra-ui/react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { Burger } from "./burger"
import { Modal } from "../modal"
import { OrderDetails } from "../order-details"
import { type BurgerItemType, burgerActions, getBurgerStore} from "../../services/slices/burger-constructor";
import { useAppDispatch, useAppSelector } from "../../services/store"
import type { DbObjectType } from "../../data"
import { createOrder } from "../../services/slices/orders"
import { getIsAuthUserFromStore } from "../../services/slices/auth"
import { useNavigate } from "react-router-dom"
import { routesInfo } from "../app-router"
import { testsConfig } from "../../utils/test-utils"

export const PLACE_ORDER_BUTTON_TEST_ID = "place_order_button"

export type BurgerConstructorProps = Omit<FlexProps, "direction" | "dir" | keyof HTMLChakraProps<"div">>

const BurgerConstructor = React.memo<BurgerConstructorProps>(({ ...flexOptions }) => {
  const lockRef = React.useRef(false) /// Needed in strict mode for ignore synthetic/fast rerender
  const { products: selectedIngredients, bun: selectedBun } = useAppSelector(getBurgerStore)
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [modalOpen, setModalOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const isAuthenticatedUser = useAppSelector(getIsAuthUserFromStore)
  const navigate = useNavigate()

  const allSelectedProductsForOrder : Array<NonNullable<typeof selectedBun>> = React.useMemo(
    () => (selectedBun ? [...Array(2).fill(selectedBun), ...selectedIngredients] : selectedIngredients),
    [selectedBun, selectedIngredients]
  )

  const calcTotalPrice = useCallback(
    (ingredients: BurgerItemType[]) => ingredients.reduce((res, curr) => (res += curr.product.price), 0),
    []
  )

  const getSelectedIngredientsIds = React.useCallback((ingredients: BurgerItemType[]) => {
    return ingredients.reduce<DbObjectType["_id"][]>((res, item) => {
      res.push(item.product._id)
      return res
    }, [])
  }, [])

  React.useEffect(() => {
    setTotalPrice(calcTotalPrice(allSelectedProductsForOrder))
  }, [calcTotalPrice, allSelectedProductsForOrder])

  const handleOrderButtonClick = React.useCallback(() => {
    if (!selectedBun) {
      return
    }

    if (!isAuthenticatedUser) {
      navigate(routesInfo.login.path, { replace: true })
    } else {
      if (lockRef.current === false) {
        lockRef.current = true
        dispatch(createOrder(getSelectedIngredientsIds(allSelectedProductsForOrder)))
        setModalOpen(true)
      }
    }
  }, [selectedBun, isAuthenticatedUser, navigate, dispatch, getSelectedIngredientsIds, allSelectedProductsForOrder])

  const handleModalClose = React.useCallback(() => {
    lockRef.current = false
    setModalOpen(false)
    dispatch(burgerActions.clearBuns())
    dispatch(burgerActions.clearSelectedIngredients())
  }, [dispatch])

  return (
    <>
      <Flex direction={"column"} gap={10} pt={100} justify="space-between" align="center" {...flexOptions}>
        <Burger />
        <Flex justify="end" align="center" w="100%" gap={10} pr={4}>
          <Flex align="center" gap={2}>
            <Text variant={"digitsMedium"}>{totalPrice}</Text>
            <Icon as={CurrencyIcon} boxSize={9} />
          </Flex>
          <Button
            htmlType="button"
            type={"primary"}
            disabled={!selectedBun}
            size="large"
            extraClass="ml-2"
            onClick={handleOrderButtonClick}
            {...{[testsConfig.dataTestIdAttribute]:PLACE_ORDER_BUTTON_TEST_ID}}
          >
            Оформить заказ
          </Button>
        </Flex>
      </Flex>
      {modalOpen ? (
        <Modal headerText="" onClose={handleModalClose}>
          <OrderDetails />
        </Modal>
      ) : null}
    </>
  )
})

export default BurgerConstructor
