import React from "react"
import { Flex, Text } from "@chakra-ui/react"
import { routesInfo } from "../../components/app-router"
import { Link } from "../../components/common"
import { UserForm, UserFormDataState } from "../../components/user-form"
import { authActions, getPasswordStateFromStore } from "../../services/slices/auth"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { useNavigate } from "react-router-dom"

export interface ForgotPasswordPageProps {}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = React.memo(() => {
  const dispatch = useAppDispatch()
  const passwordState = useAppSelector(getPasswordStateFromStore)
  const navigate = useNavigate()
  const isSubmittedRef = React.useRef(false)

  /// Redirect after success send code
  React.useEffect(() => {
    if (passwordState.resetEmailSent) {
      if (isSubmittedRef.current) {
        navigate(routesInfo.resetPassword.path)
      } else {
        dispatch(authActions.clearPasswordState())
        isSubmittedRef.current = false
      }
    }
  }, [dispatch, navigate, passwordState.resetEmailSent])

  const handleSubmit = React.useCallback(
    (dataState: UserFormDataState) => {
      !isSubmittedRef.current &&
        !passwordState.resetEmailSent &&
        dispatch(authActions.passwordReset(dataState.email.value))
      isSubmittedRef.current = true
    },
    [dispatch, passwordState.resetEmailSent]
  )

  return (
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
  )
})
