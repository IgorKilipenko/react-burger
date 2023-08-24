import { appReducer, appInitialState, setIsBackgroundRouteMode, setAppIsLoaded } from "./app-state-slice"

describe("app reducer tests", () => {
  it("should return the initial state", () => {
    expect(appReducer(undefined, { type: "unknown" })).toEqual(appInitialState)
  })

  it("should be app is loaded", () => {
    const expectState = {...appInitialState, appIsLoaded: true}
    const state = appReducer(appInitialState, setAppIsLoaded(true))
    expect(state).toEqual(expectState)
  })

  it("should be app in bg route mode", () => {
    const expectState = {...appInitialState, isBackgroundRouteMode: true}
    const state = appReducer(appInitialState, setIsBackgroundRouteMode(true))
    expect(state).toEqual(expectState)
  })
})
