import { uid } from "uid"
import { allowableCategories } from "../../../data"
import { burgerReducer, burgerInitialState, burgerActions } from "./burger-slice"
import { generateRandomString } from "../../../utils/test-utils"

type State = typeof burgerInitialState

const initialState = burgerInitialState
const reducer = burgerReducer
const actions = burgerActions

describe("burger reducer tests", () => {
  const emptyProduct: NonNullable<(typeof initialState.products)[number]> = {
    product: {
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
    },
    uid: "0",
  }

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
    }
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

    let state = reducer(initialState, actions.addIngredient(product))
    state = reducer(state, actions.removeIngredient({ uid: product.uid }))
    expect(state).toEqual(expectState)
  })

  it("should be initial state", () => {
    const product = getRandomProduct()
    const expectState = initialState

    let state = reducer(initialState, actions.addIngredient(product))
    state = reducer(state, actions.clearBurgerConstructor())
    expect(state).toEqual(expectState)
  })

  it("should not contain buns", () => {
    const ingredient = getRandomProduct(allowableCategories.main)
    const bun = getRandomProduct(allowableCategories.bun)
    const expectState = { ...initialState, products: [ingredient], productQuantities: { [ingredient.product._id]: 1 } }

    let state = reducer(initialState, actions.addIngredient(ingredient))
    state = reducer(state, actions.addIngredient(bun))
    state = reducer(state, actions.clearBuns())
    expect(state).toEqual(expectState)
  })

  it("should not contain ingredients", () => {
    const ingredient = getRandomProduct(allowableCategories.main)
    const bun = getRandomProduct(allowableCategories.bun)
    const expectState = { ...initialState, bun: bun, productQuantities: { [bun.product._id]: 1 } }

    let state = reducer(initialState, actions.addIngredient(ingredient))
    state = reducer(state, actions.addIngredient(bun))
    state = reducer(state, actions.clearSelectedIngredients())
    expect(state).toEqual(expectState)
  })

  it("should be swaped products", () => {
    const products = Array(2)
      .fill(null)
      .map(() => getRandomProduct()) as Array<typeof emptyProduct>

    const expectState = {
      ...initialState,
      products: [products[0], products[1]].reverse(),
      productQuantities: products.reduce<typeof initialState.productQuantities>((res, p) => {
        res[p.product._id] = res[p.product._id] ?? 0 + 1
        return res
      }, {}),
    }

    let state = reducer(initialState, actions.addIngredient(products[0]))
    state = reducer(state, actions.addIngredient(products[1]))
    state = reducer(state, actions.swapItemsByIndex({ fromIdx: 0, toIdx: 1 }))
    expect(state).toEqual(expectState)
  })
})
