import React, { useRef, useState } from "react"
import * as Icons from "../icons"
import { Input, InputProps } from "./input"

type Omitted = "type" | "icon" | "ref" | "onChange"
export interface PasswordInputProps extends Omit<InputProps, Omitted> {
  value: string
  icon?: "HideIcon" | "ShowIcon" | "EditIcon"
  placeholder?: string
  onChange(args: { password: string; isValid: boolean; event: React.ChangeEvent<HTMLInputElement> }): void
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  placeholder = "Пароль",
  onChange,
  size,
  icon = "ShowIcon",
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [currentIcon, setCurrentIcon] = useState<PasswordInputProps["icon"]>(icon)
  const [fieldDisabled, setDisabled] = useState(icon === "EditIcon")
  const [error, setError] = useState(false)
  const isValidRef = useRef<boolean | null>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const onIconClick = React.useCallback(() => {
    if (currentIcon === "ShowIcon") {
      setVisible(true)
      setCurrentIcon("HideIcon")
    } else {
      setDisabled(false)
      setVisible(true)
    }
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [currentIcon])

  const validateField = React.useCallback((value: string) => {
    isValidRef.current = value.length >= 6
    setError(!isValidRef.current)
  }, [])

  const onFocus = React.useCallback(() => {
    setError(false)
  }, [])

  const onBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        setError(false)
      }

      if (currentIcon === "EditIcon") {
        setDisabled(true)
      } else {
        setCurrentIcon("ShowIcon")
      }
      setVisible(false)
    },
    [currentIcon]
  )

  const handlePasswordChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateField(e.target.value)
      onChange && onChange({ password: e.target.value, isValid: isValidRef.current ?? false, event: e })
    },
    [onChange, validateField]
  )

  return (
    <Input
      type={visible ? "text" : "password"}
      autoComplete="current-password"
      placeholder={placeholder}
      onChange={handlePasswordChange}
      icon={currentIcon ? Icons[currentIcon!] : undefined}
      value={value}
      ref={inputRef}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      onIconClick={onIconClick}
      errorText={"Некорректный пароль"}
      size={size === "small" ? "small" : "default"}
      disabled={fieldDisabled}
      {...rest}
    />
  )
}
