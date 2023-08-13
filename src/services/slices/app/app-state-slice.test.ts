import { appReducer, appActions, appInitialState } from "./app-state-slice"

describe("app reducer tests", () => {
  it("should return the initial state", () => {
    expect(appReducer(undefined, { type: "unknown" })).toEqual(appInitialState)
  })

  it("should be app is loaded", () => {
    expect(appReducer(undefined, { type: "unknown" })).toEqual(appInitialState)
  })
})
