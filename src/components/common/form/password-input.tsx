import React, { useRef, useState } from "react"
import * as Icons from "../icons"
import { Input, InputProps } from "./input"

type Omitted = "type" | "icon" | "ref" | "onChange"
export interface PasswordInputProps extends Omit<InputProps, Omitted> {
  value: string
  icon?: "HideIcon" | "ShowIcon" | "EditIcon"
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidated?: (args: { name?: string; value: string; isValid: boolean }) => void
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  name,
  placeholder = "Пароль",
  size,
  icon = "ShowIcon",
  onChange,
  onFocus,
  onBlur,
  onIconClick,
  onValidated,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [currentIcon, setCurrentIcon] = useState<PasswordInputProps["icon"]>(icon)
  const [fieldDisabled, setDisabled] = useState(icon === "EditIcon")
  const [error, setError] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (currentIcon === "ShowIcon") {
        setVisible(true)
        setCurrentIcon("HideIcon")
      } else {
        setDisabled(false)
        setVisible(true)
      }
      setTimeout(() => inputRef.current?.focus(), 0)
      onIconClick && onIconClick(e)
    },
    [currentIcon, onIconClick]
  )

  const validateField = React.useCallback((value: string) => {
    const isValid = value.length >= 6
    setError(!isValid)
    onValidated && onValidated({name, value, isValid})
  }, [name, onValidated])

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

      if (currentIcon === "EditIcon") {
        setDisabled(true)
      } else {
        setCurrentIcon("ShowIcon")
      }
      setVisible(false)

      onBlur && onBlur()
    },
    [currentIcon, onBlur, validateField]
  )

  const handlePasswordChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateField(e.target.value)
      onChange && onChange(e)
    },
    [onChange, validateField]
  )

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      console.log(value)
      value.length > 3 && validateField(value)
    }, 500)
    return () => clearTimeout(timeOutId)
  }, [validateField, value])


  return (
    <Input
      type={visible ? "text" : "password"}
      name={name}
      autoComplete="current-password"
      placeholder={placeholder}
      onChange={handlePasswordChange}
      icon={currentIcon ? Icons[currentIcon!] : undefined}
      value={value}
      ref={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      error={error}
      onIconClick={handleIconClick}
      errorText={"Некорректный пароль"}
      size={size === "small" ? "small" : "default"}
      disabled={fieldDisabled}
      {...rest}
    />
  )
}
