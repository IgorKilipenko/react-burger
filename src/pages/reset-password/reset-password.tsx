import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useNavigate } from "react-router-dom"
import { routesInfo } from "../../components/app-router"
import { PasswordInput, AdvancedInput, Form } from "../../components/common/form"
import { UserFormDataState } from "../../components/user-form"
import {
  authActions,
  getIsAuthUserFromStore,
  getPasswordStateFromStore,
} from "../../services/slices/auth"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { appColors } from "../../theme/styles"

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
  const isAuthenticatedUser = useAppSelector(getIsAuthUserFromStore)
  const passwordResetState = useAppSelector(getPasswordStateFromStore)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const submittedEmailRef = React.useRef<string>(passwordResetState.confirmingEmail)

  /// Redirect when success confirmed or if it wrong path (aka directional set url)
  React.useEffect(() => {
    if (!passwordResetState.resetEmailSent) {
      navigate(routesInfo.home.path, { replace: true })
    } else if (!isAuthenticatedUser && passwordResetState.resetConfirmed) {
      navigate(routesInfo.login.path, { replace: true })
      dispatch(authActions.clearPasswordState())
    }
  }, [dispatch, isAuthenticatedUser, navigate, passwordResetState.resetConfirmed, passwordResetState.resetEmailSent])

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
      !passwordResetState.resetConfirmed &&
        dispatch(authActions.passwordResetConfirm({ password: state.password.value, token: state.code.value }))
    },
    [passwordResetState.resetConfirmed, dispatch, state.code.value, state.password.value]
  )

  return (
    <Form
      method="post"
      onSubmit={handleSubmit}
      options={{ control: { isInvalid: !!passwordResetState.error && !hasChanged } }}
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
        <Flex direction="column" align="center" color={appColors.inactive}>
          <Text>Сообщение с кодом для сброса пароля отправлено</Text>
          <Text>{`на почтовый ящик - ${submittedEmailRef.current}`}</Text>
        </Flex>
        <Flex alignSelf="center" grow={0}>
          <Button htmlType="submit" size="medium" disabled={!isValid}>
            Сохранить
          </Button>
        </Flex>
      </Flex>
    </Form>
  )
}
