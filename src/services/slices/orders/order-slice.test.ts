import { orderReducer, orderInitialState, createOrder, clearOrder, OrderPayload } from "./order-slice"

type State = typeof orderInitialState
type Order = NonNullable<State["order"]>
type OrderList = NonNullable<State["orderList"]>

const initialState: Readonly<State> = orderInitialState
const reducer = orderReducer
const actions = { createOrder, clearOrder }

describe("burger reducer tests", () => {
  const genRandomOrder = () => ({ number: Math.floor(Math.random() * 1000000) }) as Order
  const genRandomOrderList = (count = 5) => {
    return Array(count)
      .fill(0)
      .map((_, i) => i.toString() as OrderList[number])
  }

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should contain created order", () => {
    const order = genRandomOrder()
    const orderList = genRandomOrderList()
    const payload: OrderPayload = {
      data: { order, success: true },
      orderList,
    }

    const expectState: State = {
      ...initialState,
      order,
      orderList,
    }

    const state = reducer(initialState, {
      type: actions.createOrder.fulfilled,
      payload,
    })
    expect(state).toEqual(expectState)
  })

  it("should be in loading state", () => {
    const expectState: State = {
      ...initialState,
      loading: true,
    }

    const state = reducer(initialState, {
      type: actions.createOrder.pending,
    })
    expect(state).toEqual(expectState)
  })

  it("should be error", () => {
    const error = new Error("Error data received")
    const expectState: State = {
      ...initialState,
      error,
    }

    const state = reducer(initialState, {
      type: actions.createOrder.rejected,
      error,
    })
    expect(state).toEqual(expectState)
  })

  it("should be empty order", () => {
    const order = genRandomOrder()
    const orderList = genRandomOrderList()

    const expectState: State = {
      ...initialState,
    }

    const state = reducer({ ...initialState, order, orderList }, clearOrder())
    expect(state).toEqual(expectState)
  })
})
