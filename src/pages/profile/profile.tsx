import React from "react"
import { Form } from "../../components/common/form"
import { Flex, Text } from "@chakra-ui/react"
import { routesInfo } from "../../components/app-router"
import { useAppSelector } from "../../services/store"
import { getAuthStore } from "../../services/slices/auth"
import { useNavigate } from "react-router-dom"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const authState = useAppSelector(getAuthStore)

  /*React.useEffect(() => {
    authState.isAuthenticatedUser && navigate(routesInfo.home.path, { replace: true })
  }, [authState.isAuthenticatedUser, navigate])*/

  return (
    <Flex align="center" justify="center" grow={1}>
      <Form
        method="post"
        //onSubmit={handleSubmit}
        //options={{ control: { isInvalid: !!authState.error && !hasChanged } }}
      >
        <Flex direction="column" align="center" gap={6} pb={20}>
          <Text variant="mainMedium">Профиль</Text>
        </Flex>
      </Form>
    </Flex>
  )
}
