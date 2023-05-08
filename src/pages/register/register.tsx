import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { UserForm, UserFormDataState } from "../../components/user-form"
import { useAppDispatch } from "../../services/store"
import { authActions } from "../../services/slices/auth"

export const RegisterPage = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = React.useCallback(
    (dataState: UserFormDataState) => {
      dispatch(
        authActions.register({
          name: dataState.name.value,
          email: dataState.email.value,
          password: dataState.password.value,
        })
      )
    },
    [dispatch]
  )

  return (
    <Flex align="center" justify="center" grow={1}>
      <UserForm
        header="Регистрация"
        submitAction="Зарегистрироваться"
        onSubmit={handleSubmit}
        errorMessage="Ошибка регистрации. Проверьте попытку позже"
      >
        <Flex direction="column" align="center" gap={4}>
          <Flex gap={2}>
            <Text variant="mainDefault">Уже зарегистрированы?</Text>
            <Link to={routesInfo.login.path} isActive>
              <Text variant="mainDefault" color="accent-color">
                Войти
              </Text>
            </Link>
          </Flex>
        </Flex>
      </UserForm>
    </Flex>
  )
}
