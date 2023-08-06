import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../../data"

export const createOrder = createAsyncThunk("order/createOrder", async (ingredientsIds: string[], thunkApi) => {
  const { data, error } = await api.createOrderWithAuth(ingredientsIds)
  if (error || !data?.success) throw error ?? Error(data?.message ?? "Error.")
  return { data, orderList: [...ingredientsIds], error }
})

type Response = Awaited<ReturnType<typeof api.createOrderWithAuth>> & { orderList?: string[] | null }

interface OrderResponseState {
  order?: NonNullable<Response["data"]>["order"] | null
  orderList?: NonNullable<Response["orderList"]> | null
  error?: SerializedError | null
  loading: boolean
}

const initialState: OrderResponseState = {
  order: null,
  orderList: null,
  error: null,
  loading: false,
}

const orderSlice = createSlice({
  name: "orders/order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = initialState.order
      state.orderList = initialState.orderList
      state.error = initialState.error
      state.loading = initialState.loading
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, { payload }: PayloadAction<Response>) => {
      state.order = payload.data?.order
      state.orderList = payload?.orderList
      state.loading = false
    })
    builder.addCase(createOrder.rejected, (state, { error }) => {
      state.order = initialState.order
      state.orderList = initialState.orderList
      state.error = error
      state.loading = false
    })
    builder.addCase(createOrder.pending, (state) => {
      state.order = initialState.order
      state.orderList = initialState.orderList
      state.error = initialState.error
      state.loading = true
    })
  },
})

export const orderReducer = orderSlice.reducer
export const { clearOrder } = orderSlice.actions
