import React from "react"
import { OrdersList } from "../../components/orders-list"
import { Outlet, useMatches, useNavigate } from "react-router-dom"
import { Modal } from "../../components/modal"
import { routesInfo } from "../../components/app-router"
import { Order, OrderStatus } from "../../data"
import {
  clearActiveOrdersListItem,
  getActiveModalItemStore,
  setActiveOrdersListItem,
} from "../../services/slices/active-modal-items"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { NotFoundPage } from "../not-found"
import { appStateActions, getAppIsBackgroundRouteMode } from "../../services/slices/app"

const _mockOrders: Order[] = [
  {
    number: "034535",
    name: "Death Star Starship Main бургер",
    status: OrderStatus.executing,
    burgerIds: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa094a",
      "643d69a5c3f7b9001cfa0942",
    ],
  },
  {
    number: "034537",
    name: "Interstellar бургер",
    status: OrderStatus.complete,
    burgerIds: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0944",
    ],
  },
  {
    number: "034538",
    name: "Interstellar бургер",
    status: OrderStatus.complete,
    burgerIds: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0944",
    ],
  },
  {
    number: "034540",
    name: "Interstellar бургер",
    status: OrderStatus.complete,
    burgerIds: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0944",
    ],
  },
  {
    number: "034541",
    name: "Interstellar бургер",
    status: OrderStatus.complete,
    burgerIds: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0944",
    ],
  },
  {
    number: "034542",
    name: "Interstellar бургер",
    status: OrderStatus.complete,
    burgerIds: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0944",
    ],
  },
  {
    number: "034543",
    name: "Interstellar бургер",
    status: OrderStatus.complete,
    burgerIds: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0944",
    ],
  },
]

export const OrdersListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const matches = useMatches()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { activeOrdersListItem } = useAppSelector(getActiveModalItemStore)
  const isBackgroundMode = useAppSelector(getAppIsBackgroundRouteMode)
  const orderRef = React.useRef<Order| null>(null)

  const handleOrderItemClick = React.useCallback(
    (order: Order) => {
      navigate(`${routesInfo.ordersListItem.rootPath}/${order.number}`, {replace : orderRef.current ? false : false})
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
    const order = orderRef.current ?? Object.values(_mockOrders).find((item) => item.number === id)

    if (order) {
      dispatch(setActiveOrdersListItem(order))
      if (!orderRef.current) {
        dispatch(appStateActions.setIsBackgroundRouteMode(true))
      } else {
        setModalOpen(true)
      }
    } else {
      navigate("*", { replace: true })
    }
  }, [closeModal, dispatch, matches, modalOpen, navigate])

  return !isBackgroundMode ? (
    <>
      <OrdersList align="stretch" orders={_mockOrders} mt={10} pr={2} maxH="100%" onOrderClick={handleOrderItemClick} />
      {modalOpen && activeOrdersListItem && (
        <Modal headerText={activeOrdersListItem.number} onClose={closeModal}>
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
