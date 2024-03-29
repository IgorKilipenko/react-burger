import React from "react"
import { OrdersList } from "../../components/orders-list"
import { Outlet, useMatches, useNavigate } from "react-router-dom"
import { Modal } from "../../components/modal"
import { routesInfo } from "../../components/app-router"
import { Order, OrderStatus } from "../../data"
import {
  clearActiveOrdersListItem,
  getActiveModalItemStore,
  setActiveOrdersFeedItem,
} from "../../services/slices/active-modal-items"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { appStateActions, getAppIsBackgroundRouteMode } from "../../services/slices/app"
import { getOrdersFeedStore, ordersFeedActions } from "../../services/slices/orders"
import { ErrorMessage } from "../../components/error-message"
import { Flex, Text } from "@chakra-ui/react"
import { appColors } from "../../theme/styles"
import { LoadingProgress } from "../../components/common/loading-progress"

export const OrdersFeedPage = React.memo(() => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const matches = useMatches()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { activeOrdersFeedItem } = useAppSelector(getActiveModalItemStore)
  const isBackgroundMode = useAppSelector(getAppIsBackgroundRouteMode)
  const orderRef = React.useRef<Order | null>(null)
  const ordersFeedState = useAppSelector(getOrdersFeedStore)

  const handleOrderItemClick = React.useCallback(
    (order: Order) => {
      navigate(`${routesInfo.ordersFeedItem.rootPath}/${order._id}`, { replace: orderRef.current ? false : false })
      orderRef.current = order
    },
    [navigate]
  )

  const closeModal = React.useCallback(() => {
    setModalOpen(false)
    dispatch(clearActiveOrdersListItem())
    orderRef.current = null
    navigate("", { replace: true })
  }, [dispatch, navigate])

  React.useEffect(() => {
    matches.find((m) => !m.params[routesInfo.ordersFeedItem.paramName]) &&
      dispatch(appStateActions.setIsBackgroundRouteMode(false))
  }, [dispatch, matches])

  React.useEffect(() => {
    if (!ordersFeedState.transportState.connected && !ordersFeedState.transportState.connecting) {
      dispatch(ordersFeedActions.connect())
    }
    return () => {
      if (ordersFeedState.transportState.connected) {
        dispatch(ordersFeedActions.disconnect())
      }
      dispatch(appStateActions.setIsBackgroundRouteMode(false))
    }
  }, [dispatch, ordersFeedState.transportState.connected, ordersFeedState.transportState.connecting])

  React.useEffect(() => {
    const routeOrderItemMatch = matches.find(
      (m) => m.id === routesInfo.ordersFeedItem.id && m.params && m.params[routesInfo.ordersFeedItem.paramName]
    )
    if (!routeOrderItemMatch) {
      if (modalOpen) {
        closeModal()
      }
      return
    }

    const id = routeOrderItemMatch!.params!.id!
    const order = orderRef.current ?? ordersFeedState.message?.orders?.find((item) => item._id === id)

    if (order) {
      dispatch(setActiveOrdersFeedItem(order))
      if (!orderRef.current) {
        dispatch(appStateActions.setIsBackgroundRouteMode(true))
      } else {
        setModalOpen(true)
      }
    } else if (ordersFeedState.message?.orders) {
      navigate(routesInfo.notFoundPagePage.path, { replace: true })
    }
  }, [closeModal, dispatch, matches, modalOpen, navigate, ordersFeedState.message])

  const totalSection = React.useMemo(() => {
    return ordersFeedState.message?.orders ? (
      <Flex grow={1} basis={0} align="stretch" direction="column" overflow="auto" className="custom-scroll" h="100%">
        <Flex gap={9} w="100%">
          <Flex direction="column" grow={1} basis={1}>
            <Text variant="mainMedium" mb={6}>
              Готовы:
            </Text>
            <Flex direction="column" gap={2}>
              {ordersFeedState.message.orders
                .filter((o) => OrderStatus[o.status] === OrderStatus.done)
                .slice(0, 5)
                .map((o) => (
                  <Text key={o._id} variant="digitsDefault" color={appColors.success}>
                    {o.number}
                  </Text>
                ))}
            </Flex>
          </Flex>
          <Flex direction="column" grow={1} basis={1}>
            <Text variant="mainMedium" mb={6}>
              В работе:
            </Text>
            <Flex direction="column" gap={2}>
              {ordersFeedState.message.orders
                .filter((o) => OrderStatus[o.status] === OrderStatus.pending)
                .slice(0, 5)
                .map((o) => (
                  <Text key={o._id} variant="digitsDefault">
                    {o.number}
                  </Text>
                ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" mt={15} gap={16}>
          <Flex direction="column">
            <Text variant="mainMedium" mb={6}>
              Выполнено за все время:
            </Text>
            <Text variant="digitsLarge">{ordersFeedState.message.total}</Text>
          </Flex>
          <Flex direction="column">
            <Text variant="mainMedium" mb={6}>
              Выполнено за сегодня:
            </Text>
            <Text variant="digitsLarge">{ordersFeedState.message.totalToday}</Text>
          </Flex>
        </Flex>
      </Flex>
    ) : null
  }, [ordersFeedState.message?.orders, ordersFeedState.message?.total, ordersFeedState.message?.totalToday])

  const ordersFeed = React.useMemo(() => {
    return ordersFeedState.message?.orders ? (
      <Flex justify="stretch" maxH="min-content" overflow="hidden" gap={15}>
        <OrdersList grow={1} basis={0} orders={ordersFeedState.message.orders} mt={4} pr={2} onOrderClick={handleOrderItemClick} />
        {totalSection}
      </Flex>
    ) : null
  }, [handleOrderItemClick, ordersFeedState.message?.orders, totalSection])

  return !isBackgroundMode ? (
    <Flex direction="column" overflow="hidden" maxH={"100%"}>
      <Text variant="mainLarge" mt={8}>
        Лента заказов
      </Text>

      {ordersFeedState.message?.orders ? (
        ordersFeed
      ) : ordersFeedState.transportState.error ? (
        <ErrorMessage
          message={`Ошибка загрузки данных.\nСообщение сервера: ${ordersFeedState.transportState.error?.message}`}
        />
      ) : null}

      {modalOpen && activeOrdersFeedItem && (
        <Modal w={{ base: "sm", sm: "md", md: "620px" }} onClose={closeModal}>
          <Outlet context={{ order: activeOrdersFeedItem }} />
        </Modal>
      )}
    </Flex>
  ) : activeOrdersFeedItem ? (
    <Flex grow={1} justify="center">
      <Flex shrink={1}>
        <Outlet context={{ order: activeOrdersFeedItem }} />
      </Flex>
    </Flex>
  ) : (
    <LoadingProgress />
  )
})
