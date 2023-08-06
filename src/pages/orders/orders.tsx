import React from "react"
import { OrdersList } from "../../components/orders-list"
import { Outlet, useMatches, useNavigate } from "react-router-dom"
import { Modal } from "../../components/modal"
import { routesInfo } from "../../components/app-router"
import { Order } from "../../data"
import {
  clearActiveOrdersListItem,
  getActiveModalItemStore,
  setActiveOrdersListItem,
} from "../../services/slices/active-modal-items"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { NotFoundPage } from "../not-found"
import { appStateActions, getAppIsBackgroundRouteMode } from "../../services/slices/app"
import { getOrdersListStore, ordersListActions } from "../../services/slices/orders"
import { LoadingProgress } from "../../components/common/loading-progress"
import { ErrorMessage } from "../../components/error-message"
import { Flex } from "@chakra-ui/react"

export const OrdersListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const matches = useMatches()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { activeOrdersListItem } = useAppSelector(getActiveModalItemStore)
  const isBackgroundMode = useAppSelector(getAppIsBackgroundRouteMode)
  const orderRef = React.useRef<Order | null>(null)
  const ordersListState = useAppSelector(getOrdersListStore)

  const handleOrderItemClick = React.useCallback(
    (order: Order) => {
      navigate(`${routesInfo.ordersListItem.rootPath}/${order._id}`, { replace: orderRef.current ? false : false })
      orderRef.current = order
    },
    [navigate]
  )

  const closeModal = React.useCallback(() => {
    setModalOpen(false)
    dispatch(clearActiveOrdersListItem())
    navigate("", { replace: true })
  }, [dispatch, navigate])

  React.useEffect(() => {
    return () => {
      dispatch(appStateActions.setIsBackgroundRouteMode(false))
    }
  }, [dispatch, isBackgroundMode])

  React.useEffect(() => {
    if (!ordersListState.transportState.connected && !ordersListState.transportState.connecting) {
      dispatch(ordersListActions.connect())
    }
    return () => {
      if (ordersListState.transportState.connected) {
        dispatch(ordersListActions.disconnect())
      }
    }
  }, [dispatch, ordersListState.transportState.connected, ordersListState.transportState.connecting])

  React.useEffect(() => {
    const routeOrderItemMatch = matches.find(
      (m) => m.id === routesInfo.ordersListItem.id && m.params && m.params[routesInfo.ordersListItem.paramName]
    )
    if (!routeOrderItemMatch) {
      if (modalOpen) {
        closeModal()
      }
      return
    }

    const id = routeOrderItemMatch!.params!.id!
    const order = orderRef.current ?? ordersListState.message?.orders?.find((item) => item._id === id)

    if (order) {
      dispatch(setActiveOrdersListItem(order))
      if (!orderRef.current) {
        dispatch(appStateActions.setIsBackgroundRouteMode(true))
      } else {
        setModalOpen(true)
      }
    } else if (ordersListState.message) {
      navigate(routesInfo.notFoundPagePage.path, { replace: true })
    }
  }, [
    closeModal,
    dispatch,
    matches,
    modalOpen,
    navigate,
    ordersListState.message,
    ordersListState.message?.orders,
    ordersListState.transportState.connected,
  ])

  return !isBackgroundMode ? (
    <>
      {ordersListState.message?.orders ? (
        <OrdersList
          align="stretch"
          orders={ordersListState.message.orders}
          mt={10}
          pr={2}
          maxH="100%"
          onOrderClick={handleOrderItemClick}
        />
      ) : ordersListState.transportState.error ? (
        <ErrorMessage
          message={`Ошибка загрузки данных.\nСообщение сервера: ${ordersListState.transportState.error?.message}`}
        />
      ) : null}
      {modalOpen && activeOrdersListItem && (
        <Modal w={{ base: "sm", sm: "md", md: "620px" }} onClose={closeModal}>
          <Outlet context={{ order: activeOrdersListItem }} />
        </Modal>
      )}
    </>
  ) : activeOrdersListItem ? (
    <Outlet context={{ order: activeOrdersListItem }} />
  ) : (
    <NotFoundPage />
  )
}
