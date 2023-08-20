import { uid } from "uid"
import { allowableCategories } from "../../../data"
import { burgerReducer, burgerInitialState, burgerActions } from "./burger-slice"
import { generateRandomString } from "../../../utils/test-utils"

type State = typeof burgerInitialState

const initialState: Readonly<State> = burgerInitialState
const reducer = burgerReducer
const actions = burgerActions

describe("burger reducer tests", () => {
  const getRandomProduct = (
    type: (typeof initialState.products)[number]["product"]["type"] = allowableCategories.main
  ) => {
    return {
      product: {
        _id: generateRandomString(),
        name: generateRandomString(),
        type,
        proteins: Math.random() * 10,
        fat: Math.random() * 10,
        carbohydrates: Math.random() * 10,
        calories: Math.random() * 10,
        price: Math.max(Math.random() * 100, 1),
        image: generateRandomString(),
        image_mobile: generateRandomString(),
        image_large: generateRandomString(),
      },
      uid: uid(),
    } as (typeof initialState.products)[number]
  }

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should contain added ingredient", () => {
    const product = getRandomProduct()
    const expectState: State = {
      ...initialState,
      products: [product],
      productQuantities: { [product.product._id]: 1 },
    }

    const state = reducer(initialState, actions.addIngredient(product))
    expect(state).toEqual(expectState)
  })

  it("should contain added bun", () => {
    const bun = getRandomProduct(allowableCategories.bun)
    const expectState: State = { ...initialState, bun: bun, productQuantities: { [bun.product._id]: 1 } }

    const state = reducer(initialState, actions.addIngredient(bun))
    expect(state).toEqual(expectState)
  })

  it("should not contain removed ingredient", () => {
    const product = getRandomProduct()
    const expectState = initialState

    let state: State = { ...initialState, products: [product], productQuantities: { [product.product._id]: 1 } }
    state = reducer(state, actions.removeIngredient({ uid: product.uid }))
    expect(state).toEqual(expectState)
  })

  it("should clear all products / reset state", () => {
    const product = getRandomProduct()
    const expectState = initialState

    let state: State = { ...initialState, products: [product], productQuantities: { [product.product._id]: 1 } }
    state = reducer(state, actions.clearBurgerConstructor())
    expect(state).toEqual(expectState)
  })

  it("should not contain buns", () => {
    const ingredient = getRandomProduct(allowableCategories.main)
    const bun = getRandomProduct(allowableCategories.bun)
    const expectState = { ...initialState, products: [ingredient], productQuantities: { [ingredient.product._id]: 1 } }

    let state: State = {
      ...expectState,
      bun: bun,
      productQuantities: { ...expectState.productQuantities, [bun.product._id]: 1 },
    }
    state = reducer(state, actions.clearBuns())
    expect(state).toEqual(expectState)
  })

  it("should not contain ingredients", () => {
    const ingredient = getRandomProduct(allowableCategories.main)
    const bun = getRandomProduct(allowableCategories.bun)
    const expectState = { ...initialState, bun: bun, productQuantities: { [bun.product._id]: 1 } }

    let state: State = {
      ...expectState,
      products: [ingredient],
      productQuantities: { ...expectState.productQuantities, [ingredient.product._id]: 1 },
    }
    state = reducer(state, actions.clearSelectedIngredients())
    expect(state).toEqual(expectState)
  })

  it("should be swaped products", () => {
    const products = Array(2)
      .fill(null)
      .map(() => getRandomProduct()).sort((a,b) => a.product._id > b.product._id ? -1 : a.product._id === b.product._id ? 1 : 0)

    const expectState = {
      ...initialState,
      products: [...products].reverse(),
      productQuantities: products.reduce<typeof initialState.productQuantities>((res, p) => {
        res[p.product._id] = res[p.product._id] ?? 0 + 1
        return res
      }, {}),
    }

    let state: State = {
      ...expectState,
      products: [...products],
    }
    state = reducer(state, actions.swapItemsByIndex({ fromIdx: 0, toIdx: 1 }))
    expect(state).toEqual(expectState)
  })
})
