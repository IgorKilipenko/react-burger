import { RootState } from "../../store"

export { orderReducer, createOrder, clearOrder } from "./order-slice"
export { ordersListReducer, ordersListActions } from "./orders-list-slice"

export const getOrdersStore = (state: RootState) => state.orders
export const getCreatedOrderFromOrdersStore = (state: RootState) => state.orders.order

export const getOrdersListStore = (state: RootState) => state.ordersList