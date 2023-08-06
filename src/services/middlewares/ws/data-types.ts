import { Order } from "../../../data"

export interface TransportState {
  connected: boolean
  connecting: boolean
  error?: Error | null
}

export interface OrdersListMessage {
  success: boolean,
  orders?: Order[] | null,
  total?: number | null
  totalToday?: number | null
}