import React, { useCallback } from "react"
import { Flex, FlexProps, HTMLChakraProps, Text } from "@chakra-ui/react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { CurrencyIcon } from "../common/icons"
import { Icon } from "../common/icon"
import { Burger } from "./burger"
import { Modal } from "../modal"
import { OrderDetails } from "../order-details"
import { BurgerItemType, burgerActions, getBurgerStore } from "../../services/slices/burger-constructor"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { allowableCategories, DbObjectType } from "../../data"
import { createOrder } from "../../services/slices/orders"
import { getIsAuthUserFromStore } from "../../services/slices/auth"
import { useNavigate } from "react-router-dom"
import { routesInfo } from "../app-router"

export interface BurgerConstructorProps extends Omit<FlexProps, "direction" | "dir" | keyof HTMLChakraProps<"div">> {}

const BurgerConstructor = React.memo<BurgerConstructorProps>(({ ...flexOptions }) => {
  const lockRef = React.useRef(false) /// Needed in strict mode for ignore synthetic/fast rerender
  const { products: selectedIngredients, bun: selectedBun } = useAppSelector(getBurgerStore)
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [modalOpen, setModalOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const isAuthenticatedUser = useAppSelector(getIsAuthUserFromStore)
  const navigate = useNavigate()

  const allSelectedProductsForOrder = React.useMemo(
    () => (selectedBun ? [selectedBun, ...selectedIngredients] : selectedIngredients),
    [selectedBun, selectedIngredients]
  )

  const calcTotalPrice = useCallback(
    (ingredients: BurgerItemType[]) =>
      ingredients.reduce(
        (res, curr) => (res += curr.product.price * (curr.product.type === allowableCategories.bun ? 2 : 1)),
        0
      ),
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
    if (!isAuthenticatedUser) {
      navigate(routesInfo.login.path, { replace: true })
    } else {
      if (lockRef.current === false) {
        lockRef.current = true
        dispatch(createOrder(getSelectedIngredientsIds(allSelectedProductsForOrder)))
        setModalOpen(true)
      }
    }
  }, [isAuthenticatedUser, navigate, dispatch, getSelectedIngredientsIds, allSelectedProductsForOrder])

  const handleModalClose = React.useCallback(() => {
    lockRef.current = false
    setModalOpen(false)
    dispatch(burgerActions.clearSelectedIngredients())
  },[dispatch])

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
          onClose={handleModalClose}
        >
          <OrderDetails />
        </Modal>
      ) : null}
    </>
  )
})

export default BurgerConstructor
