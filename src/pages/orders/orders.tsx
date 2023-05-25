import React from "react"
import { Order, OrderStatus, OrdersList } from "../../components/orders-list"

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

export const OrdersPage: React.FC = () => {
  return <OrdersList align="stretch" orders={_mockOrders} mt={10} pr={2} maxH="100%" />
}
