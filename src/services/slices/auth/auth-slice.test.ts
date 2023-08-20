import {
  authReducer,
  authInitialState,
  authActions,
  RegisterPayload,
  LoginPayload,
  GetUserPayload,
  UpdateUserPayload,
  LogoutPayload,
} from "./auth-slice"
import { generateRandomString } from "../../../utils/test-utils"
import { WithoutNullableKeys } from "../../../utils/types"

type State = typeof authInitialState
type User = NonNullable<State["user"]>

const initialState: Readonly<State> = authInitialState
const reducer = authReducer
const actions = authActions

describe("burger reducer tests", () => {
  const genRandomUser = () => {
    return {
      name: generateRandomString(),
      email: generateRandomString(),
      //} as {[K in keyof User]: NonNullable<User[K]>}
    } as WithoutNullableKeys<User>
  }

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should register user", () => {
    const user = genRandomUser()
    const payload: RegisterPayload = { data: { user, success: true } }

    const expectState: State = {
      ...initialState,
      user,
      isAuthenticatedUser: true,
    }

    const state = reducer(initialState, {
      type: actions.thunk.register.fulfilled,
      payload,
    })
    expect(state).toEqual(expectState)
  })

  it("should logged-in user", () => {
    const user = genRandomUser()
    const payload: LoginPayload = { data: { user, success: true } }

    const expectState: State = {
      ...initialState,
      user,
      isAuthenticatedUser: true,
    }

    const state = reducer(initialState, {
      type: actions.thunk.login.fulfilled,
      payload,
    })
    expect(state).toEqual(expectState)
  })

  it("should return current user", () => {
    const user = genRandomUser()
    const payload: GetUserPayload = { data: { user, success: true } }

    const expectState: State = {
      ...initialState,
      user,
      isAuthenticatedUser: true,
    }

    const state = reducer(initialState, {
      type: actions.thunk.getUser.fulfilled,
      payload,
    })
    expect(state).toEqual(expectState)
  })

  it("should update current user", () => {
    const user = genRandomUser()
    const payload: UpdateUserPayload = { data: { user, success: true } }

    const expectState: State = {
      ...initialState,
      user,
      isAuthenticatedUser: true,
    }

    const state = reducer(initialState, {
      type: actions.thunk.updateUser.fulfilled,
      payload,
    })
    expect(state).toEqual(expectState)
  })

  it("should logout current user", () => {
    const user = genRandomUser()
    const payload: LogoutPayload = { data: { message: "OK", success: true } }

    const expectState: State = {
      ...initialState,
    }

    const state = reducer(
      { ...initialState, user, isAuthenticatedUser: true },
      {
        type: actions.thunk.logout.fulfilled,
        payload,
      }
    )
    expect(state).toEqual(expectState)
  })

  it("should loading", () => {
    const expectState: State = {
      ...initialState,
      loading: true,
    }

    Object.values(actions.thunk).forEach((action) => {
      const state = reducer(initialState, {
        type: action.pending,
      })
      expect(state).toEqual(expectState)
    })
  })

  it("should be error", () => {
    const error = new Error("Error")
    const expectState: State = {
      ...initialState,
      error,
    }

    Object.values(actions.thunk).forEach((action) => {
      const state = reducer(initialState, {
        type: action.rejected,
        error,
      })
      expect(state).toEqual(expectState)
    })
  })
})
