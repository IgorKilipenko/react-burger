import { allowableCategories, parseRawIngredientsData } from "../../../data"
import {
  productsReducer,
  productsInitialState,
  clearProducts,
  getAllIngredients,
  ProductsPayload,
} from "./products-slice"
import { generateRandomString } from "../../../utils/test-utils"

type State = typeof productsInitialState
type Product = NonNullable<State["products"]>[keyof NonNullable<State["products"]>][number]

const initialState: Readonly<State> = productsInitialState
const reducer = productsReducer
const actions = { clearProducts, getAllIngredients }

describe("burger reducer tests", () => {
  const genRandomProduct = (type: Product["type"] = allowableCategories.main) => {
    return {
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
    } as Product
  }

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should contain all ingredients from payload", () => {
    const products = Array(5)
      .fill(null)
      .map((_, i) => genRandomProduct((i + 1) % 3 === 0 ? allowableCategories.bun : allowableCategories.main))
    const payload: ProductsPayload = {
      data: { data: products, success: true },
    }

    const { table: expectProducts, categories: expectedCategories } = parseRawIngredientsData(products)

    const expectState: State = {
      ...initialState,
      products: expectProducts,
      categories: expectedCategories,
    }

    const state = reducer(initialState, {
      type: actions.getAllIngredients.fulfilled,
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
      type: actions.getAllIngredients.pending,
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
      type: actions.getAllIngredients.rejected,
      error,
    })
    expect(state).toEqual(expectState)
  })

  it("should be empty products", () => {
    const expectState: State = {
      ...initialState,
    }

    const state = reducer(initialState, clearProducts())
    expect(state).toEqual(expectState)
  })
})
