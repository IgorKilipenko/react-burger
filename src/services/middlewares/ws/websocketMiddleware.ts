import { Middleware } from "redux"
import { RootState } from "../../store"
import { ordersListActions } from "../../slices/orders"
import { tokenManager } from "../../../data/utils"

export const websocketMiddleware = (
  url: string,
  actions: typeof ordersListActions,
  authRequired: boolean = false
): Middleware<{}, RootState> => {
  return (store) => (next) => (action) => {
    let socket: WebSocket | null = null

    const { dispatch } = store
    const { type } = action
    const token = authRequired ? tokenManager.getAccess() : null

    if (type === actions.connect.type) {
      socket = new WebSocket(`${url}${token ? `?token=${token}` : ""}`)
    }

    if (socket) {
      socket.onopen = () => {
        dispatch(actions.connectionSuccess())
      }

      socket.onerror = () => {
        dispatch(actions.error(new Error("Websocket error")))
      }

      socket.onmessage = (event) => {
        const { data } = event
        const msg = JSON.parse(data)

        if (msg.success) {
          dispatch(actions.message(msg))
        } else {
          dispatch(actions.error(msg.message))
        }
      }

      if (type === actions.disconnect.type) {
        socket.close()
      }
    }

    next(action)
  }
}
