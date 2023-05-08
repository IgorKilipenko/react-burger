import React from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Form, EmailInput, PasswordInput } from "../../components/common/form"
import { Flex, FormErrorMessage, Text } from "@chakra-ui/react"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { authActions, getAuthStore } from "../../services/slices/auth"
import { useNavigate } from "react-router-dom"
import { useToastStatus } from "../../hooks"
import { ProfileContainer } from "../profile"

export const LoginPage = () => {
  const [state, setState] = React.useState<Record<string, { value: string; isValid: boolean }>>({
    password: { value: "", isValid: false },
    email: { value: "", isValid: false },
  })
  const [hasChanged, setHasChanged] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authState = useAppSelector(getAuthStore)
  const toast = useToastStatus()

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.length === 0) {
      return
    }
    setState((prevState) => {
      console.assert(e.target.name in prevState)

      return {
        ...prevState,
        [e.target.name]: { value: e.target.value, isValid: false },
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
        console.assert(prevState[name].value === value, `Warn! state value [${prevState[name].value}] !== ${value}`)

        return {
          ...prevState,
          [name]: { ...prevState[name], isValid },
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
      dispatch(authActions.login({ email: state.email.value, password: state.password.value }))
    },
    [dispatch, state.email.value, state.password.value]
  )

  React.useEffect(() => {
    if (authState.isAuthenticatedUser) {
      toast({ status: "success", message: "- выполнен вход" })
      const timeoutId = setTimeout(() => navigate(routesInfo.home.path, { replace: true }), 5000)
      return () => clearTimeout(timeoutId)
    }
  }, [authState.isAuthenticatedUser, navigate, toast])

  return (
    <ProfileContainer>
      <Form
        method="post"
        onSubmit={handleSubmit}
        options={{ control: { isInvalid: !!authState.error && !hasChanged } }}
      >
        <Flex direction="column" align="center" gap={6} pb={20}>
          <Text variant="mainMedium">Вход</Text>
          <EmailInput value={state.email.value} name="email" onChange={handleChange} onValidated={handleValidate} />
          <PasswordInput
            value={state.password.value}
            name="password"
            onChange={handleChange}
            onValidated={handleValidate}
          />
          <FormErrorMessage>
            <Flex direction={"column"} color="error-color">
              <Text>Ошибка входа. Проверьте учетные данные и повторите попытку</Text>
              {authState.error?.message ? <Text>{`Сообщение сервера: "${authState.error?.message}"`}</Text> : null}
            </Flex>
          </FormErrorMessage>
          <Flex alignSelf="center" grow={0}>
            <Button htmlType="submit" size="medium" disabled={!isValid}>
              Войти
            </Button>
          </Flex>
        </Flex>
        <Flex direction="column" align="center" gap={4}>
          <Flex gap={2}>
            <Text variant="mainDefault">Вы - новый пользователь?</Text>
            <Link to={routesInfo.register.path} isActive>
              <Text variant="mainDefault" color="accent-color">
                Зарегистрироваться
              </Text>
            </Link>
          </Flex>
          <Flex gap={2}>
            <Text variant="mainDefault">Забыли пароль?</Text>
            <Link to={routesInfo.forgotPassword.path} isActive>
              <Text variant="mainDefault" color="accent-color">
                Восстановить пароль
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Form>
    </ProfileContainer>
  )
}
