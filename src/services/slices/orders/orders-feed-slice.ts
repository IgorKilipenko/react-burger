import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { OrdersListMessage, TransportState } from "../../middlewares/ws"

export interface OrdersFeedState {
  message?: OrdersListMessage | null
  transportState: TransportState
}

const initialState: OrdersFeedState = {
  message: null,
  transportState: {
    connected: false,
    connecting: false,
    error: null,
  },
}

const ordersFeedSlice = createSlice({
  name: "orders/feed",
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

export const ordersFeedReducer = ordersFeedSlice.reducer
export const ordersFeedActions = ordersFeedSlice.actions
export const ordersFeedInitialState: Readonly<OrdersFeedState> = { ...initialState }
