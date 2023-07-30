import React from "react"
import { Avatar, AvatarGroup, Flex, Text } from "@chakra-ui/react"
import { BurgerIngredientType, DbObjectType, Order, OrderStatus } from "../../data"
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

  const getIngredient = React.useCallback(
    (id: DbObjectType["_id"]) => {
      return Object.entries(ingredients!).reduce<BurgerIngredientType | null>((res, [_, items]) => {
        if (!res) {
          res = items.find((x) => x._id === id) ?? null
        }
        return res
      }, null)
    },
    [ingredients]
  )

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
          {order.burgerIds.map((id, i, arr) => {
            const ingredient = getIngredient(id)
            console.assert(ingredient)
            return ingredient ? (
              <Avatar
                key={i}
                showBorder
                borderColor={appColors.accent}
                bg={appColors.bodyBackground}
                zIndex={zIndexBase + arr.length - i}
                boxShadow={"2px 0px 2px 0px #1c1c1c"}
                name={getIngredient(id)?.name ?? ""}
                src={ingredient.image}
              />
            ) : null
          })}
        </AvatarGroup>
      )
    },
    [getIngredient, maxVisibleOrderItems]
  )

  return (
    <Flex
      direction="column"
      align="stretch"
      grow={1}
      gap={6}
      overflow="auto"
      className="custom-scroll"
      {...(props as ContainerOptions)}
    >
      {Object.entries(orders).map(([k, item], i) => {
        return (
          <Link onClick={() => handleOrderItemClick(item)}>
            <Flex key={k} direction="column" align="stretch" p={6} bg={appColors.bodyAltBackground} borderRadius="40px">
              <Flex direction="column" grow={1} gap={6} pb={2}>
                <Flex justify="space-between">
                  <Text variant="digitsDefault">{`#${item.number}`}</Text>
                  <FormattedDate date={item.date ?? new Date(Date.now() - i * 24 * 1000 * 3600)} />
                </Flex>
                <Text variant="mainMedium">{`${item.name}`}</Text>
              </Flex>
              <Flex direction="column" grow={1} gap={6}>
                <Text
                  variant="mainDefault"
                  color={item.status === OrderStatus.complete ? appColors.success : undefined}
                >
                  {capitalizeFirstLetter(`${item.status}`)}
                </Text>
                <Flex justify="stretch" gap={6}>
                  <Flex grow={1}>{buildIconsSection(item)}</Flex>
                  <Flex justify="end" align="center" gap={2}>
                    <Text variant="digitsDefault">480</Text>
                    <Icon as={CurrencyIcon} type="primary" boxSize={6} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Link>
        )
      })}
    </Flex>
  )
}
