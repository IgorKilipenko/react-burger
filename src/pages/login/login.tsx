import React from "react"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Form, EmailInput, PasswordInput } from "../../components/common/form"
import { Flex, Text } from "@chakra-ui/react"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { PasswordInputProps } from "../../components/common/form"
import { EmailInputProps } from "../../components/common/form"

export const LoginPage = () => {
  const [email, setEmail] = React.useState({ content: "", isValid: false })
  const [password, setPassword] = React.useState({ content: "", isValid: false })

  const handleEmailChange: EmailInputProps["onChange"] = React.useCallback(({ email, isValid }) => {
    setEmail({
      content: email,
      isValid: isValid,
    })
  }, [])

  const handlePasswordChange: PasswordInputProps["onChange"] = React.useCallback(({ password, isValid }) => {
    setPassword({
      content: password,
      isValid: isValid,
    })
  }, [])

  const handleInputBlur = React.useCallback((e?: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!e) {
      return
    }
    if (e.target.name === "email") {
      setEmail((prevState) => ({
        ...prevState,
        isValid: e.target.validity.valid,
      }))
    } else if (e.target.name === "password") {
      setPassword((prevState) => ({
        ...prevState,
        isValid: e.target.validity.valid,
      }))
    } else {
      console.assert(false)
    }
  }, [])

  return (
    <Flex align="center" justify="center" grow={1}>
      <Form method="post" action="/login">
        <Flex direction="column" gap={6} pb={20}>
          <EmailInput value={email.content} name="email" onChange={handleEmailChange} onBlur={handleInputBlur} />
          <PasswordInput
            value={password.content}
            name="password"
            onChange={handlePasswordChange}
            onBlur={handleInputBlur}
          />
          <Flex alignSelf="center" grow={0}>
            <Button htmlType="submit" size="medium" disabled={!(email.isValid && password.isValid)}>
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
