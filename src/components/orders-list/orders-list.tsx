import React from "react"
import { Avatar, AvatarGroup, Flex, Text } from "@chakra-ui/react"
import { BurgerIngredientType, Order, OrderStatus } from "../../data"
import { getProductsFromProductsStore } from "../../services/slices/products"
import { useAppSelector } from "../../services/store"
import { capitalizeFirstLetter } from "../../utils"
import { appColors } from "../../theme/styles"
import { Icon, Link } from "../common"
import { CurrencyIcon } from "../common/icons"
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { FlexContainer } from "../../utils/types"

type _FlexOmitted = "direction" | "dir"
type ContainerOptions = Omit<FlexContainer, _FlexOmitted>
export interface OrdersListProps extends ContainerOptions {
  orders: Order[]
  maxVisibleOrderItems?: number
  onOrderClick?: (order: Order) => void
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders, maxVisibleOrderItems = 5, onOrderClick, ...props }) => {
  const ingredients = useAppSelector(getProductsFromProductsStore)
  const zIndexBase = 10

  const sortedOrders = React.useMemo(() => {
    return [...orders].sort((a, b) => Number.parseInt(b.number) - Number.parseInt(a.number))
  }, [orders])

  const calcTotalPrice = React.useCallback((ingredients: BurgerIngredientType[]) => {
    return ingredients.reduce<number>((res, ingredient) => res + ingredient.price, 0)
  }, [])

  const ordersIngredientsMap = React.useMemo<Record<Order["_id"], BurgerIngredientType[]>>(() => {
    if (!ingredients) {
      return {}
    }

    const allIngredients = Object.values(ingredients).reduce<BurgerIngredientType[]>((res, ingredients) => {
      res = [...res, ...ingredients]
      return res
    }, [])

    return orders.reduce<Record<Order["_id"], BurgerIngredientType[]>>((res, order) => {
      res[order._id] = order.ingredients.reduce<BurgerIngredientType[]>((res, ingredientId) => {
        const val = allIngredients.find((ingredient) => ingredient._id === ingredientId)
        val && res.push(val)
        return res
      }, [])
      return res
    }, {})
  }, [ingredients, orders])

  const handleOrderItemClick = React.useCallback(
    (order: Order) => {
      onOrderClick && order && onOrderClick(order)
    },
    [onOrderClick]
  )

  const buildIconsSection = React.useCallback(
    (order: Order) => {
      return (
        <AvatarGroup size="lg" max={maxVisibleOrderItems} spacing={-4}>
          {ordersIngredientsMap[order._id].map((ingredient, i, arr) => {
            console.assert(ingredient)

            return ingredient ? (
              <Avatar
                key={i}
                showBorder
                borderColor={appColors.accent}
                bg={appColors.bodyBackground}
                zIndex={zIndexBase + arr.length - i}
                boxShadow={"2px 0px 2px 0px #1c1c1c"}
                name={ingredient.name}
                src={ingredient.image}
              />
            ) : null
          })}
        </AvatarGroup>
      )
    },
    [maxVisibleOrderItems, ordersIngredientsMap]
  )

  return (
    <Flex className="custom-scroll" {...(props as ContainerOptions)} overflow="auto" pr={4}>
      <Flex direction="column" align="stretch" grow={1} gap={6} >
        {sortedOrders.map((item) => {
          return (
            <Link key={item._id} onClick={() => handleOrderItemClick(item)}>
              <Flex direction="column" align="stretch" p={6} bg={appColors.bodyAltBackground} borderRadius="40px">
                <Flex direction="column" grow={1} gap={6} pb={2}>
                  <Flex justify="space-between">
                    <Text variant="digitsDefault">{`#${item.number}`}</Text>
                    <FormattedDate date={new Date(item.createdAt)} />
                  </Flex>
                  <Text variant="mainMedium">{`${item.name}`}</Text>
                </Flex>
                <Flex direction="column" grow={1} gap={6}>
                  <Text
                    variant="mainDefault"
                    color={OrderStatus[item.status] === OrderStatus.done ? appColors.success : undefined}
                  >
                    {capitalizeFirstLetter(OrderStatus[item.status])}
                  </Text>
                  <Flex justify="stretch" gap={6}>
                    <Flex grow={1}>{buildIconsSection(item)}</Flex>
                    <Flex justify="end" align="center" gap={2}>
                      <Text variant="digitsDefault">{calcTotalPrice(ordersIngredientsMap[item._id])}</Text>
                      <Icon as={CurrencyIcon} type="primary" boxSize={6} />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          )
        })}
      </Flex>
    </Flex>
  )
}
