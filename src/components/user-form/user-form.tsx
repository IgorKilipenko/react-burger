import React from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Form, EmailInput, PasswordInput, Input, AdvancedInput } from "../common/form"
import { Flex, FormErrorMessage, Text } from "@chakra-ui/react"
import { useAppSelector } from "../../services/store"
import { getAuthStore } from "../../services/slices/auth"
import { FlexOptions } from "../../utils/types"
import { FormProps } from "../common/form/form"
import { EditIcon } from "../common/icons"

export interface UserFormDataState {
  name: { value: string; isValid: false }
  password: { value: string; isValid: false }
  email: { value: string; isValid: false }
}

export interface UserFormProps
  extends Omit<FlexOptions, "direction" | "dir">,
    Omit<FormProps, "children" | "onSubmit"> {
  header?: string | null
  submitAction?: string | null
  withEditIcons?: boolean
  children?: React.ReactElement
  onSubmit?: (dataState: UserFormDataState) => void | null
  values?: Partial<Record<keyof UserFormDataState, string | null>> | null
  isReadOnly?: boolean | null
}

export const UserForm = React.memo<UserFormProps>(
  ({ header = null, submitAction = null, withEditIcons = false, onSubmit = null, children, values, ...props }) => {
    const [state, setState] = React.useState<UserFormDataState>({
      name: { value: values?.name ?? "", isValid: false },
      password: { value: values?.password ?? "", isValid: false },
      email: { value: values?.email ?? "", isValid: false },
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
      },
      []
    )

    const isValid = React.useMemo(() => {
      return !Object.values(state).some((item) => item.value.length === 0 || !item.isValid)
    }, [state])

    const handleSubmit = React.useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setHasChanged(false)
        onSubmit && onSubmit({ ...state } as UserFormDataState)
      },
      [onSubmit, state]
    )

    return (
      <Form
        method="post"
        onSubmit={handleSubmit}
        options={{ control: { isInvalid: !!authState.error && !hasChanged } }}
        {...(props as FormProps)}
      >
        <Flex direction="column" align="center" gap={6} pb={20} {...(props as FlexOptions)}>
          {header ? <Text variant="mainMedium">{header}</Text> : null}
          <AdvancedInput
            value={state.name.value}
            name="name"
            placeholder="Имя"
            onChange={handleChange}
            onValidated={handleValidate}
            isIcon={withEditIcons}
          />
          <EmailInput
            value={state.email.value}
            name="email"
            onChange={handleChange}
            onValidated={handleValidate}
            isIcon={withEditIcons}
          />
          <PasswordInput
            value={state.password.value}
            icon={withEditIcons ? "EditIcon" : undefined}
            name="password"
            onChange={handleChange}
            onValidated={handleValidate}
          />
          <FormErrorMessage>
            <Text color="error-color">Ошибка регистрации. Проверьте попытку позже</Text>
            {authState.error?.message ? <Text color="error-color">{authState.error?.message}</Text> : null}
          </FormErrorMessage>
          {submitAction ? (
            <Flex alignSelf="center" grow={0}>
              <Button htmlType="submit" size="medium" disabled={!isValid}>
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
