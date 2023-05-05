import React, { useRef, useState } from "react"
import { EditIcon } from "../icons"
import { Input, InputProps } from "./input"

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

type Omitted = "type" | "ref" | "onChange"
export interface EmailInputProps extends Omit<InputProps, Omitted> {
  value: string
  placeholder?: string
  isIcon?: boolean
  onChange(args: { email: string; isValid: boolean; event: React.ChangeEvent<HTMLInputElement> }): void
}

export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  size = "default",
  placeholder = "E-mail",
  isIcon = false,
  onBlur,
  onFocus,
  onIconClick,
  ...rest
}) => {
  const [fieldDisabled, setDisabled] = useState(isIcon)
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setDisabled(false)
      setTimeout(() => inputRef.current?.focus(), 0)

      onIconClick && onIconClick(e)
    },
    [onIconClick]
  )

  const validateField = React.useCallback((value: string) => {
    setError(!validateEmail(value))
  }, [])

  const handleFocus = React.useCallback(() => {
    setError(false)
    onFocus && onFocus()
  }, [onFocus])

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value) {
        validateField(e.target.value)
      } else {
        setError(false)
      }
      isIcon && setDisabled(true)

      onBlur && onBlur()
    },
    [isIcon, onBlur, validateField]
  )

  const handleEmailChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange({ email: e.target.value, isValid: !error, event: e })
    },
    [error, onChange]
  )

  return (
    <Input
      type="email"
      autoComplete="email"
      placeholder={placeholder}
      onChange={handleEmailChange}
      icon={isIcon ? EditIcon : undefined}
      value={value}
      ref={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      error={error}
      disabled={fieldDisabled}
      onIconClick={handleIconClick}
      errorText={"Ой, произошла ошибка!"}
      size={size}
      {...rest}
    />
  )
}
