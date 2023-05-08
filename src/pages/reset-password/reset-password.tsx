import { Flex, Text } from "@chakra-ui/react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import { useNavigate } from "react-router-dom"
import { routesInfo } from "../../components/app-router"
import { PasswordInput, AdvancedInput, Form } from "../../components/common/form"
import { UserFormDataState } from "../../components/user-form"
import { authActions, getAuthStore } from "../../services/slices/auth"
import { useAppDispatch, useAppSelector } from "../../services/store"

export interface ResetPasswordPageProps {}

interface InputsState {
  password: UserFormDataState["password"]
  code: UserFormDataState["name"]
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = () => {
  const [state, setState] = React.useState<InputsState>({
    password: { value: "", isValid: false },
    code: { value: "", isValid: false },
  })
  const [hasChanged, setHasChanged] = React.useState(false)
  const authState = useAppSelector(getAuthStore)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
          prevState[name as keyof InputsState].value === value,
          `Warn! state value [${prevState[name as keyof InputsState].value}] !== ${value}`
        )

        return {
          ...prevState,
          [name]: { ...prevState[name as keyof InputsState], isValid },
        }
      })
    },
    []
  )

  const isValid = React.useMemo(() => {
    return !Object.entries(state).some(([key, item]) => item.value.length === 0 || !item.isValid)
  }, [state])

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setHasChanged(false)
      !authState.passwordResetInfo.resetConfirmed &&
        dispatch(authActions.passwordResetConfirm({ password: state.password.value, token: state.code.value }))
    },
    [authState.passwordResetInfo.resetConfirmed, dispatch, state.code.value, state.password.value]
  )

  React.useEffect(() => {
    !authState.isAuthenticatedUser &&
      authState.passwordResetInfo.resetConfirmed &&
      navigate(routesInfo.login.path, { replace: true })
  }, [authState.isAuthenticatedUser, authState.passwordResetInfo.resetConfirmed, navigate])

  return (
    <Flex align="center" justify="center" grow={1}>
      <Form
        method="post"
        onSubmit={handleSubmit}
        options={{ control: { isInvalid: !!authState.error && !hasChanged } }}
      >
        <Flex direction="column" align="center" gap={6} pb={20}>
          <Text variant="mainMedium">Восстановление пароля</Text>
          <PasswordInput
            value={state.password.value}
            name="password"
            placeholder="Введите новый пароль"
            onChange={handleChange}
            onValidated={handleValidate}
            autoComplete="new-password"
          />
          <AdvancedInput
            value={state.code.value}
            name="code"
            placeholder="Введите код из письма"
            onChange={handleChange}
            onValidated={handleValidate}
            autoComplete="one-time-code"
          />
          <Flex alignSelf="center" grow={0}>
            <Button htmlType="submit" size="medium" disabled={!isValid}>
              Сохранить
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  )
}
