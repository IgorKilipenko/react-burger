export const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space",
  endpoints: {
    orders: "api/orders",
    ingredients: "api/ingredients",
    auth: {
      path: "api/auth",
      get login() {
        return `${this.path}/login`
      },
      get register() {
        return `${this.path}/register`
      },
      get logout() {
        return `${this.path}/logout`
      },
      get token() {
        return `${this.path}/token`
      },
      get user() {
        return `${this.path}/user`
      },
      get passwordReset() {
        return `${this.path.replace(/(.+)\/auth$/, "$1")}/password-reset`
      },
      get passwordResetConfirm() {
        return `${this.passwordReset}/reset`
      },
    },
  },
  wss: {
    baseWssUrl: "wss://norma.nomoreparties.space",
    endpoints: {
      ordersList: "orders",
      get ordersFeed() {
        return `${this.ordersList}/all`
      },
    },
  },
}
