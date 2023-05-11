import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { Link } from "../../components/common"
import { routesInfo } from "../../components/app-router"
import { UserForm, UserFormDataState } from "../../components/user-form"
import { useAppDispatch } from "../../services/store"
import { authActions } from "../../services/slices/auth"

export const RegisterPage = React.memo(() => {
  const dispatch = useAppDispatch()
  const isSubmittedRef = React.useRef(false)

  const handleSubmit = React.useCallback(
    (dataState: UserFormDataState) => {
      if (!isSubmittedRef.current) {
        dispatch(
          authActions.register({
            name: dataState.name.value,
            email: dataState.email.value,
            password: dataState.password.value,
          })
        )
        isSubmittedRef.current = true
      }
    },
    [dispatch]
  )

  return (
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
  )
})
