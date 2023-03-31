import { mockMatchMedia } from "../../test-utils/mock-match-media"
import { render, screen } from "@testing-library/react"
import App from "./app"

describe("<App />", () => {
  beforeEach(() => {
    mockMatchMedia("(prefers-color-scheme: dark)", true)
  })
  test("has header", () => {
    render(<App />)
    const linkElement = screen.getByText(/Личный кабинет/i)
    expect(linkElement).toBeInTheDocument()
  })
})
