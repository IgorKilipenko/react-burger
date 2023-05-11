import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../../data"

export interface PasswordResetResponse extends Awaited<ReturnType<typeof api.auth.passwordReset>> {
  confirmingEmail: string;
}
export interface PasswordResetConfirmResponse extends Awaited<ReturnType<typeof api.auth.passwordResetConfirm>> {}

export const passwordReset = createAsyncThunk("auth/passwordReset", async (email: string) => {
  const { data, error } = await api.auth.passwordReset({ email })

  if (error || !data || !data.success) {
    throw Error(
      data?.message ??
        (error?.message && error.message.length > 0 ? error.message : "Неизвестная ошибка запроса на сброс пароля")
    )
  }

  return {data, error, confirmingEmail:email } as PasswordResetResponse
})

export const passwordResetConfirm = createAsyncThunk(
  "auth/passwordResetConfirm",
  async ({ password, token }: { password: string; token: string }) => {
    const { data, error } = await api.auth.passwordResetConfirm({ password, token })

    if (error || !data || !data.success) {
      throw Error(
        data?.message ??
          (error?.message && error.message.length > 0
            ? error.message
            : "Неизвестная ошибка подтверждения на сброс пароля")
      )
    }

    return { data, error } as PasswordResetConfirmResponse
  }
)