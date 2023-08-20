import { data as ingredients } from "../fixtures/ingredients.json"
const uri = `http://localhost:${process.env.PORT ?? 3000}`
const testidTag = "data-testid"

describe("burger constructor tests", () => {
  const ingredient = ingredients[Math.floor(Math.random() * (ingredients.length - 1))]
  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", { fixture: "ingredients.json" })
    cy.visit(uri)
  })

  it("should open modal container with selected ingredient", () => {
    cy.get(`[${testidTag}=ingredient_id_${ingredient._id}]`).click()
    cy.get(`[${testidTag}=modal_container]`).should("exist")
    cy.get(`[${testidTag}=ingredient_details]`).should("exist")
    cy.get(`[${testidTag}=ingredient_details_name]`).should("have.text", ingredient.name)

    cy.get(`[${testidTag}=modal_container_close_button]`).should("exist").click()
    cy.get(`[${testidTag}=modal_container]`).should("not.exist")
  })
})
