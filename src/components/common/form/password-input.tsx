import React, { useRef, useState } from "react"
import * as Icons from "../icons"
import { Input, InputProps } from "./input"

type Omitted = "type" | "icon" | "ref"
interface PasswordInputProps extends Omit<InputProps, Omitted> {
  value: string
  icon?: 'HideIcon' | 'ShowIcon' | 'EditIcon';
  placeholder?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
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

  const inputRef = useRef<HTMLInputElement>(null)

  const onIconClick = () => {
    if (currentIcon === "ShowIcon") {
      setVisible(true)
      setCurrentIcon("HideIcon")
    } else {
      setDisabled(false)
      setVisible(true)
    }
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const validateField = (value: string) => {
    setError(value.length < 6)
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

    if (currentIcon === "EditIcon") {
      setDisabled(true)
    } else {
      setCurrentIcon("ShowIcon")
    }
    setVisible(false)
  }

  return (
    <Input
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      onChange={onChange}
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
