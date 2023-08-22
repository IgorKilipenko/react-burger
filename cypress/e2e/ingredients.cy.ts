import { data as ingredients } from "../fixtures/ingredients.json"
import { apiConfig } from "../../src/data/api-config"
import { generateRandomString, testsConfig } from "../../src/utils/test-utils"
import { MODAL_CONTAINER_TEST_ID } from "../../src/components/modal"
import { MODAL_CONTAINER_CLOSE_BUTTON_TEST_ID } from "../../src/components/modal/modal-close-button"
import { INGREDIENT_DETAILS_TEST_ID, INGREDIENT_DETAILS_HEADER_TEST_ID } from "../../src/components/ingredient-details"

const uri = "/"

const buildSelector = (id: string) => {
  return `[${testsConfig.dataTestIdAttribute}=${id}]`
}

const getRandomProduct = () => {
  return ingredients[Math.floor(Math.random() * (ingredients.length - 1))]
}

const getRandomIngredient = () => {
  const filterIngredients = ingredients.filter((p) => p.type !== "bun")
  return filterIngredients[Math.floor(Math.random() * (filterIngredients.length - 1))]
}

const getRandomBun = () => {
  const buns = ingredients.filter((p) => p.type === "bun")
  return buns[Math.floor(Math.random() * (buns.length - 1))]
}

const genOrder = (orderList: typeof ingredients) => {
  return {
    success: true,
    name: generateRandomString(),
    order: {
      ingredients: orderList.reduce<typeof ingredients>((res, item) => {
        res.push(item)
        if (item.type === "bun") res.push(item)
        return res
      }, []),
      _id: generateRandomString(10),
      owner: {
        name: generateRandomString(),
        email: generateRandomString(),
        createdAt: Date.now().toLocaleString(),
        updatedAt: Date.now().toLocaleString(),
      },
      status: "done",
      name: generateRandomString(),
      createdAt: Date.now().toLocaleString(),
      updatedAt: Date.now().toLocaleString(),
      number: Math.floor(Math.random() * 10000),
      price: orderList.reduce<number>((acc, p) => acc + p.price, 0),
    },
  }
}

describe("burger constructor tests", () => {
  const dragIngredients = (items: typeof ingredients) => {
    items.forEach((ingredient) => {
      cy.get(`[${testsConfig.dataTestIdAttribute}=dnd_burger_container]`).should("exist")
      cy.get(`[${testsConfig.dataTestIdAttribute}=ingredient_id_${ingredient._id}]`)
        .should("exist")
        .trigger("dragstart")
      cy.get(`[${testsConfig.dataTestIdAttribute}=dnd_burger_container]`).trigger("drop")
    })
  }

  beforeEach(() => {
    cy.intercept("GET", `${apiConfig.baseUrl}/${apiConfig.endpoints.ingredients}`, { fixture: "ingredients.json" })
    cy.intercept("GET", `${apiConfig.baseUrl}/${apiConfig.endpoints.auth.user}`, { fixture: "auth.json" })
    cy.setCookie("accessToken", "token")
    cy.visit(uri)
  })

  it("should open modal container with selected ingredient", () => {
    const ingredient = getRandomProduct()

    cy.get(buildSelector(`ingredient_id_${ingredient._id}`))
      .should("exist")
      .click()
    cy.get(buildSelector(MODAL_CONTAINER_TEST_ID)).should("exist")
    cy.get(buildSelector(INGREDIENT_DETAILS_TEST_ID)).should("exist")
    cy.get(buildSelector(INGREDIENT_DETAILS_HEADER_TEST_ID)).should("exist").should("have.text", ingredient.name)

    cy.get(buildSelector(MODAL_CONTAINER_CLOSE_BUTTON_TEST_ID)).should("exist").click()
    cy.get(buildSelector(MODAL_CONTAINER_TEST_ID)).should("not.exist")
  })

  it("should put burger ingredients to constructor and create order", () => {
    const bun = getRandomBun()
    const ingredients = Array(5)
      .fill(null)
      .map(() => getRandomIngredient())

    dragIngredients([bun])
    dragIngredients(ingredients)

    cy.fixture("order.json").then((order) => {
      order = { ...order, ...genOrder([bun, ...ingredients]) }
      cy.intercept("POST", `${apiConfig.baseUrl}/${apiConfig.endpoints.orders}`, order)
    })

    cy.get("button").contains("Оформить заказ").should("exist").click()

    cy.get(buildSelector(MODAL_CONTAINER_TEST_ID)).should("exist")
  })
})
