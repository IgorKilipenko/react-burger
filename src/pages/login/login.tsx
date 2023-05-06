import React from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Form, EmailInput, PasswordInput } from "../../components/common/form"
import { Flex, Text } from "@chakra-ui/react"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"

export const LoginPage = () => {
  const [state, setState] = React.useState<Record<string, string>>({ password: "", email: "" })
  const [validateState, setValidateState] = React.useState<Record<string, boolean>>({
    passwordValid: false,
    emailValid: false,
  })

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.length === 0) {
      return
    }
    setValidateState((prevState) => ({
      ...prevState,
      [`${e.target.name}Valid`]: false,
    }))
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleValidate = React.useCallback(({ name, isValid }: { name?: string; value: string; isValid: boolean }) => {
    if (!name || name.length === 0) {
      return
    }
    setValidateState((prevState) => ({
      ...prevState,
      [`${name}Valid`]: isValid,
    }))
  }, [])

  return (
    <Flex align="center" justify="center" grow={1}>
      <Form method="post" action="/login">
        <Flex direction="column" gap={6} pb={20}>
          <EmailInput value={state.email} name="email" onChange={handleChange} onValidated={handleValidate} />
          <PasswordInput value={state.password} name="password" onChange={handleChange} onValidated={handleValidate} />
          <Flex alignSelf="center" grow={0}>
            <Button
              htmlType="submit"
              size="medium"
              disabled={
                !(
                  state.email.length > 0 &&
                  validateState.emailValid &&
                  state.password.length > 0 &&
                  validateState.passwordValid
                )
              }
            >
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
    </Flex>
  )
}
