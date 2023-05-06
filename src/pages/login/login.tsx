import React from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Form, EmailInput, PasswordInput } from "../../components/common/form"
import { Flex, Text } from "@chakra-ui/react"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"

export const LoginPage = () => {
  const [state, setState] = React.useState<Record<string, { value: string; isValid: boolean }>>({
    password: { value: "", isValid: false },
    email: { value: "", isValid: false },
  })

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

  return (
    <Flex align="center" justify="center" grow={1}>
      <Form method="post" action="/login">
        <Flex direction="column" gap={6} pb={20}>
          <EmailInput value={state.email.value} name="email" onChange={handleChange} onValidated={handleValidate} />
          <PasswordInput
            value={state.password.value}
            name="password"
            onChange={handleChange}
            onValidated={handleValidate}
          />
          <Flex alignSelf="center" grow={0}>
            <Button
              htmlType="submit"
              size="medium"
              disabled={
                !(
                  state.email.value.length > 0 &&
                  state.email.isValid &&
                  state.password.value.length > 0 &&
                  state.password.isValid
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
