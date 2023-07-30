import React from "react"
import { Order, OrderStatus, OrdersList } from "../../components/orders-list"
import { Outlet, useLocation, useMatches, useNavigate } from "react-router-dom"
import { Modal } from "../../components/modal"
import { routesInfo } from "../../components/app-router"

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
    number: "034534",
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
    number: "034534",
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
    number: "034534",
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
    number: "034534",
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
    number: "034534",
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
    number: "034534",
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

export const OrdersBoardPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const matches = useMatches()
  const navigate = useNavigate()
  const { state: locationState } = useLocation()

  const handleOrderItemClick = React.useCallback(
    (orderNumber: string) => {
      navigate(`${routesInfo.ordersBoardItem.rootPath}/${orderNumber}`, { state: { orderNumber } })
    },
    [navigate]
  )

  const order = React.useMemo(() => {
    const orderItem = matches.find((m) => m.params && m.params["id"])
    return orderItem ? "111" : null
  }, [matches])

  return (
    <>
      <OrdersList align="stretch" orders={_mockOrders} mt={10} pr={2} maxH="100%" onOrderClick={handleOrderItemClick} />
      {order && (
        <Modal headerText="teeee">
          <Outlet />
        </Modal>
      )}
    </>
  )
}
