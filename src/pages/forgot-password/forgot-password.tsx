import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { routesInfo } from "../../components/app-router"
import { Link } from "../../components/common"
import { UserForm, UserFormDataState } from "../../components/user-form"
import { authActions, getPasswordStateFromStore } from "../../services/slices/auth"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { useNavigate } from "react-router-dom"

export interface ForgotPasswordPageProps {}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
  const dispatch = useAppDispatch()
  const passwordState = useAppSelector(getPasswordStateFromStore)
  const navigate = useNavigate()

  const handleSubmit = React.useCallback(
    (dataState: UserFormDataState) => {
      dispatch(authActions.passwordReset(dataState.email.value))
    },
    [dispatch]
  )

  React.useEffect(() => {
    passwordState?.resetEmailSent && navigate(routesInfo.resetPassword.path)
  },[navigate, passwordState?.resetEmailSent])

  return (
    <Flex align="center" justify="center" grow={1}>
      <UserForm
        header="Восстановление пароля"
        submitAction={"Восстановить"}
        inputs={{ email: true }}
        inputPlaceholders={{ email: "Укажите e-mail" }}
        errorMessage="Ошибка восстановления пароля"
        onSubmit={handleSubmit}
      >
        <Flex direction="column" align="center" gap={4}>
          <Flex gap={2}>
            <Text variant="mainDefault">Вспомнили пароль?</Text>
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
