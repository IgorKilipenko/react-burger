import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../../data"

export const createOrder = createAsyncThunk("order/createOrder", async (ingredients: string[]) => {
  return await api.createOrder(ingredients)
})

type Response = Awaited<ReturnType<typeof api.createOrder>>

interface OrderResponseState {
  order?: NonNullable<Response["data"]>["order"] | null
  error?: SerializedError | null
  loading: boolean
}

const initialState: OrderResponseState = {
  order: null,
  error: null,
  loading: false,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, { payload }: PayloadAction<Response>) => {
      if (payload.error || !payload.data?.success || !payload.data?.order) {
        state.error = payload.error ?? Error(payload.data?.message ?? "Ошибка создания заказа.")
      } else {
        state.order = payload.data.order
      }
      state.loading = false
    })
    builder.addCase(createOrder.rejected, (state, { error }) => {
      state.order = initialState.order
      state.error = error
      state.loading = false
    })
    builder.addCase(createOrder.pending, (state) => {
      state.error = initialState.error
      state.loading = true
    })
  },
})

export const orderReducer = orderSlice.reducer
