import React, { useRef, useState } from "react"
import { EditIcon } from "../icons"
import { Input, InputProps } from "./input"

const defaultValidator = (value: string) => {
  return value.length > 0
}

type Omitted = "ref" | "onChange"
export interface AdvancedInputProps extends Omit<InputProps, Omitted> {
  value: string
  placeholder?: string
  isIcon?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidated?: (args: { name?: string; value: string; isValid: boolean }) => void
  validator?: (value: string) => boolean
}

export const AdvancedInput: React.FC<AdvancedInputProps> = ({
  name,
  value,
  onChange,
  size = "default",
  isIcon = false,
  onBlur,
  onFocus,
  onIconClick,
  onValidated,
  validator,
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

  const validateField = React.useCallback(
    (value: string) => {
      const isValid = validator ? validator(value) : defaultValidator(value)
      setError(!isValid)
      onValidated && onValidated({ name, value, isValid })
    },
    [name, onValidated, validator]
  )

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
      onChange && onChange(e)
    },
    [onChange]
  )

  React.useEffect(() => {
    const timeOutId = setTimeout(() => value && value.length > 4 && validateField(value), 500)
    return () => clearTimeout(timeOutId)
  }, [validateField, value])

  return (
    <Input
      name={name}
      onChange={handleEmailChange}
      icon={isIcon ? EditIcon : undefined}
      value={value}
      ref={inputRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      error={error}
      disabled={fieldDisabled}
      onIconClick={handleIconClick}
      errorText={"Невалидный формат"}
      size={size}
      {...rest}
    />
  )
}
