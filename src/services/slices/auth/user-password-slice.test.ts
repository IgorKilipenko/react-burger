import {
  userPasswordReducer,
  userPasswordInitialState,
  userPasswordActions,
  UserPasswordResetPayload,
  UserPasswordResetConfirmPayload,
} from "./user-password-slice"
import { generateRandomString } from "../../../utils/test-utils"

type State = typeof userPasswordInitialState

const initialState: Readonly<State> = userPasswordInitialState
const reducer = userPasswordReducer
const actions = userPasswordActions

describe("burger reducer tests", () => {
  const genRandomEmail = () => generateRandomString(10)

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should password reset", () => {
    const email = genRandomEmail()
    const payload: UserPasswordResetPayload = { data: { message: "OK", success: true }, confirmingEmail: email }

    const expectState: State = {
      ...initialState,
      resetEmailSent: true,
      confirmingEmail: email,
    }

    const state = reducer(initialState, {
      type: actions.thunk.passwordReset.fulfilled,
      payload,
    })

    expect(state).toEqual(expectState)
  })

  it("should confirmed password reset", () => {
    const payload: UserPasswordResetConfirmPayload = { data: { message: "OK", success: true } }

    const expectState: State = {
      ...initialState,
      resetConfirmed: true,
    }

    const state = reducer(initialState, {
      type: actions.thunk.passwordResetConfirm.fulfilled,
      payload,
    })

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
