import React, { useRef, useState } from "react"
import { EditIcon } from "../icons"
import { Input, InputProps } from "./input"

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

type Omitted = "type" | "ref"
export interface EmailInputProps extends Omit<InputProps, Omitted> {
  value: string
  placeholder?: string
  isIcon?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  size = "default",
  placeholder = "E-mail",
  isIcon = false,
  ...rest
}) => {
  const [fieldDisabled, setDisabled] = useState(isIcon)

  const [error, setError] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    setDisabled(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const validateField = (value: string) => {
    setError(!validateEmail(value))
  }

  const onFocus = () => {
    setError(false)
  }

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      validateField(e.target.value)
    } else {
      setError(false)
    }
    isIcon && setDisabled(true)
  }
  return (
    <Input
      type="email"
      placeholder={placeholder}
      onChange={onChange}
      icon={isIcon ? EditIcon : undefined}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      disabled={fieldDisabled}
      onIconClick={onIconClick}
      errorText={"Ой, произошла ошибка!"}
      size={size}
      {...rest}
    />
  )
}
