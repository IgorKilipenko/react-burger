import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from "@reduxjs/toolkit"
import { api } from "../../../data"

export const createOrder = createAsyncThunk("order/createOrder", async (ingredients: string[]) => {
  const { data, error } = await api.createOrder(ingredients)
  if (error || !data?.success) throw error ?? Error(data?.message ?? "Error.")
  return { data, error }
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
  reducers: {
    clearOrder: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, { payload }: PayloadAction<Response>) => {
      state.order = payload.data?.order
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
export const { clearOrder } = orderSlice.actions
