import React from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Form, EmailInput, PasswordInput, AdvancedInput } from "../common/form"
import { Flex, FormErrorMessage, Text } from "@chakra-ui/react"
import { useAppSelector } from "../../services/store"
import { getAuthStore } from "../../services/slices/auth"
import { FlexOptions } from "../../utils/types"
import { FormProps } from "../common/form/form"

interface UserFormDataStateValue {
  value: string
  isValid: boolean
}

export type UserFormDataState = Record<"name" | "password" | "email", UserFormDataStateValue>

export interface UserFormProps
  extends Omit<FlexOptions, "direction" | "dir">,
    Omit<FormProps, "children" | "onSubmit"> {
  header?: string | null
  submitAction?: string | null
  withEditIcons?: boolean
  children?: React.ReactElement
  onSubmit?: (dataState: UserFormDataState) => void
  values?: Partial<Record<keyof UserFormDataState, string | null>> | null
  isReadOnly?: boolean | null
  inputs?: Partial<Record<keyof UserFormDataState, boolean | null | undefined>>
  inputPlaceholders?: Partial<Record<keyof UserFormDataState, string | undefined>>
  errorMessage?: string
  forceSubmit?: boolean | null
  onValidated?: (args: { name?: string; value: string; isValid: boolean }) => void
}

export const UserForm = React.memo<UserFormProps>(
  ({
    header = null,
    submitAction = null,
    withEditIcons = false,
    onSubmit,
    children,
    values,
    inputs = { email: true, name: true, password: true },
    inputPlaceholders = { name: "Имя" },
    errorMessage,
    forceSubmit = false,
    onValidated,
    ...props
  }) => {
    const [state, setState] = React.useState<UserFormDataState>({
      name: { value: "", isValid: false },
      password: { value: "", isValid: false },
      email: { value: "", isValid: false },
    })
    const [hasChanged, setHasChanged] = React.useState(false)
    const authState = useAppSelector(getAuthStore)

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name.length === 0) {
        return
      }
      setState((prevState) => {
        console.assert(e.target.name in prevState)

        return {
          ...prevState,
          [e.target.name]: {
            value: e.target.value,
            isValid: e.target.name === "name" ? e.target.validity.valid : false,
          },
        }
      })
      setHasChanged(true)
    }, [])

    const handleValidate = React.useCallback(
      ({ name, isValid, value }: { name?: string; value: string; isValid: boolean }) => {
        if (!name || name.length === 0) {
          return
        }
        setState((prevState) => {
          console.assert(
            prevState[name as keyof UserFormDataState].value === value,
            `Warn! state value [${prevState[name as keyof UserFormDataState].value}] !== ${value}`
          )

          return {
            ...prevState,
            [name]: { ...prevState[name as keyof UserFormDataState], isValid },
          }
        })

        onValidated && onValidated({ name, value, isValid })
      },
      []
    )

    const isValid = React.useMemo(() => {
      return !Object.entries(state).some(
        ([key, item]) => inputs?.[key as keyof UserFormDataState] && (item.value.length === 0 || !item.isValid)
      )
    }, [inputs, state])

    const handleSubmit = React.useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setHasChanged(false)
        onSubmit && onSubmit({ ...state } as UserFormDataState)
      },
      [onSubmit, state]
    )

    React.useEffect(() => {
      setState({
        name: { value: values?.name ?? "", isValid: false },
        password: { value: values?.password ?? "", isValid: false },
        email: { value: values?.email ?? "", isValid: false },
      })
    }, [values])

    return (
      <Form
        method="post"
        onSubmit={handleSubmit}
        options={{ control: { isInvalid: !!authState.error && !hasChanged } }}
        {...(props as FormProps)}
      >
        <Flex direction="column" align="center" gap={6} pb={20} {...(props as FlexOptions)}>
          {header ? <Text variant="mainMedium">{header}</Text> : null}
          {inputs.name ? (
            <AdvancedInput
              value={state.name.value}
              name="name"
              placeholder={inputPlaceholders.name}
              onChange={handleChange}
              onValidated={handleValidate}
              isIcon={withEditIcons}
            />
          ) : null}
          {inputs.email ? (
            <EmailInput
              value={state.email.value}
              name="email"
              placeholder={inputPlaceholders.email}
              onChange={handleChange}
              onValidated={handleValidate}
              isIcon={withEditIcons}
            />
          ) : null}
          {inputs.password ? (
            <PasswordInput
              placeholder={inputPlaceholders.password}
              value={state.password.value}
              icon={withEditIcons ? "EditIcon" : undefined}
              name="password"
              onChange={handleChange}
              onValidated={handleValidate}
            />
          ) : null}
          {errorMessage ? (
            <FormErrorMessage>
              <Flex direction={"column"} color="error-color">
                <Text>{errorMessage}</Text>
                {authState.error?.message ? <Text>{`Сообщение сервера: "${authState.error?.message}"`}</Text> : null}
              </Flex>
            </FormErrorMessage>
          ) : null}
          {submitAction ? (
            <Flex alignSelf="center" grow={0}>
              <Button htmlType="submit" size="medium" disabled={!(forceSubmit || isValid)}>
                {submitAction}
              </Button>
            </Flex>
          ) : null}
        </Flex>
        {children}
      </Form>
    )
  }
)
