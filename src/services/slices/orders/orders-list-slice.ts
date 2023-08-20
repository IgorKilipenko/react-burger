import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { OrdersListMessage, TransportState } from "../../middlewares/ws"

export interface OrdersListState {
  message?: OrdersListMessage | null
  transportState: TransportState
}

const initialState: OrdersListState = {
  message: null,
  transportState: {
    connected: false,
    connecting: false,
    error: null,
  },
}

const ordersListSlice = createSlice({
  name: "orders/list",
  initialState,
  reducers: {
    clearOrdersList: (state) => {
      state.message = initialState.message
      state.transportState = initialState.transportState
    },

    error: (state, { payload: error }: PayloadAction<Error>) => {
      state.transportState.error = error
      state.transportState.connecting = false
      state.transportState.connected = false
    },

    connectionSuccess: (state) => {
      state.transportState.error = initialState.transportState.error
      state.transportState.connecting = false
      state.transportState.connected = true
    },

    message: (state, { payload: message }: PayloadAction<OrdersListMessage>) => {
      state.message = message
    },

    connect: (state) => {
      state.transportState.error = initialState.transportState.error
      state.transportState.connected = false
      state.transportState.connecting = true
    },

    disconnect: (state) => {
      state.transportState.error = initialState.transportState.error
      state.transportState.connected = false
      state.transportState.connecting = false
    },
  },
})

export const ordersListReducer = ordersListSlice.reducer
export const ordersListActions = ordersListSlice.actions
export const ordersListInitialState: Readonly<OrdersListState> = { ...initialState }
