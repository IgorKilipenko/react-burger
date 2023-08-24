import { uid } from "uid"
import { ordersListReducer, ordersListInitialState, ordersListActions } from "./orders-list-slice"
import { generateRandomString } from "../../../utils/test-utils"

type State = typeof ordersListInitialState
type Message = NonNullable<State["message"]>
type Order = NonNullable<Message["orders"]>[number]

const initialState: Readonly<State> = ordersListInitialState
const reducer = ordersListReducer
const actions = ordersListActions

describe("burger reducer tests", () => {
  const genRandomIngredients = (count = 5) => {
    return Array(count)
      .fill(0)
      .map((_, i) => i.toString() as Order["ingredients"][number])
  }

  const genRandomOrder = ({
    status = "done",
    ingredientsCount = 5,
  }: {
    status?: Order["status"]
    ingredientsCount?: number
  }) =>
    ({
      number: uid(),
      name: generateRandomString(),
      status,
      ingredients: genRandomIngredients(ingredientsCount),
      createdAt: Date.now().toLocaleString(),
      updatedAt: Date.now().toLocaleString(),
    }) as Order

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should contain data from message", () => {
    const order = genRandomOrder({})
    const message: Message = {
      success: true,
      orders: [order],
      total: 1,
      totalToday: 1,
    }

    const expectState: State = {
      ...initialState,
      message,
    }

    const state = reducer(initialState, actions.message(message))
    expect(state).toEqual(expectState)
  })

  it("should be connecting", () => {
    const expectState: State = {
      ...initialState,
      transportState: { ...initialState.transportState, connecting: true },
    }

    const state = reducer(initialState, actions.connect())
    expect(state).toEqual(expectState)
  })

  it("should be connected", () => {
    const expectState: State = {
      ...initialState,
      transportState: { ...initialState.transportState, connected: true },
    }

    const state = reducer(initialState, actions.connectionSuccess())
    expect(state).toEqual(expectState)
  })

  it("should be disconnected with save received messages data", () => {
    const prevState: State = {
      ...initialState,
      message: { success: true, orders: [], total: 0, totalToday: 0 },
      transportState: { ...initialState.transportState, connected: true },
    }

    const expectState: State = {
      ...prevState,
      transportState: { ...initialState.transportState },
    }

    const state = reducer(prevState, actions.disconnect())

    expect(state).toEqual(expectState)
  })

  it("should be transport error with save received messages data", () => {
    const prevState: State = {
      ...initialState,
      message: { success: true, orders: [], total: 0, totalToday: 0 },
      transportState: { ...initialState.transportState, connected: true },
    }

    const error = new Error("Connection error")
    const expectState: State = {
      ...prevState,
      transportState: { ...initialState.transportState, error },
    }

    const state = reducer(prevState, actions.error(error))
    expect(state).toEqual(expectState)
  })
})
