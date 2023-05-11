import React from "react"
import { AdvancedInput, AdvancedInputProps } from "./advanced-input"

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

type Omitted = "type" | "autoComplete"
export interface EmailInputProps extends Omit<AdvancedInputProps, Omitted> {
  value: string
  placeholder?: string
  isIcon?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidated?: (args: { name?: string; value: string; isValid: boolean }) => void
}

export const EmailInput: React.FC<EmailInputProps> = ({
  placeholder = "E-mail",
  errorText = "Невалидный формат почты",
  ...rest
}) => {
  return (
    <AdvancedInput
      type="email"
      autoComplete="email"
      placeholder={placeholder}
      errorText={errorText}
      validator={validateEmail}
      {...rest}
    />
  )
}
