import {
  activeModalItemReducer,
  activeModalItemInitialState,
  setActiveIngredient,
  clearActiveIngredient,
  setActiveOrdersListItem,
  clearActiveOrdersListItem,
  setActiveOrdersFeedItem,
  clearActiveOrdersFeedItem,
} from "./active-modal-item-slice"

type InitialStateType = typeof initialState

const initialState = activeModalItemInitialState
const reducer = activeModalItemReducer
const actions = {
  setActiveIngredient,
  clearActiveIngredient,
  setActiveOrdersListItem,
  clearActiveOrdersListItem,
  setActiveOrdersFeedItem,
  clearActiveOrdersFeedItem,
}

describe("active modal reducer tests", () => {
  const emptyIngredient: NonNullable<typeof initialState.activeIngredient> = {
    _id: "0",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
  }

  const emptyOrder : NonNullable<typeof initialState.activeOrdersListItem> = {
    _id: "0",
    number: "",
    name: "",
    status: "done",
    ingredients: [],
    createdAt: "",
    updatedAt: ""
  }

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should be set active modal ingredient", () => {
    const expectState: InitialStateType = { ...initialState, activeIngredient: emptyIngredient }

    const state = reducer(initialState, actions.setActiveIngredient(emptyIngredient))
    expect(state).toEqual(expectState)
  })

  it("should be clear active modal ingredient", () => {
    const expectState: InitialStateType = initialState

    const state = reducer({...initialState, activeIngredient:emptyIngredient}, actions.clearActiveIngredient())
    expect(state).toEqual(expectState)
  })

  it("should be set active modal orders list item", () => {
    const expectState: InitialStateType = { ...initialState, activeOrdersListItem: emptyOrder }

    const state = reducer(initialState, actions.setActiveOrdersListItem(emptyOrder))
    expect(state).toEqual(expectState)
  })

  it("should be clear active modal orders list item", () => {
    const expectState: InitialStateType = initialState

    const state = reducer({...initialState, activeOrdersListItem:emptyOrder}, actions.clearActiveOrdersListItem())
    expect(state).toEqual(expectState)
  })

  it("should be set active modal orders feed item", () => {
    const expectState: InitialStateType = { ...initialState, activeOrdersFeedItem: emptyOrder }

    const state = reducer(initialState, actions.setActiveOrdersFeedItem(emptyOrder))
    expect(state).toEqual(expectState)
  })

  it("should be clear active modal orders feed item", () => {
    const expectState: InitialStateType = initialState

    const state = reducer({...initialState, activeOrdersFeedItem:emptyOrder}, actions.clearActiveOrdersFeedItem())
    expect(state).toEqual(expectState)
  })
})
