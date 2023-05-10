import React from "react"
import { UserForm, UserFormDataState } from "../../components/user-form"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { authActions, getAuthStore } from "../../services/slices/auth"

export const ProfilePage = () => {
  const authState = useAppSelector(getAuthStore)
  const dispatch = useAppDispatch()

  const handleSubmit = React.useCallback(
    (userData: UserFormDataState) => {
      const data = Object.entries(userData).reduce<Partial<Record<keyof UserFormDataState, string>>>(
        (res, [key, val]) => {
          const currVal = val.isValid ? val.value : undefined
          if (currVal) {
            res[key as keyof UserFormDataState] = currVal
          }
          return res
        },
        {}
      )
      dispatch(authActions.updateUser(data))
    },
    [dispatch]
  )

  const loadedUserData = React.useMemo(() => {
    if (!authState.isAuthenticatedUser) return undefined
    return {
      name: authState.user.name,
      email: authState.user.email,
      password: "",
    }
  }, [authState.isAuthenticatedUser, authState.user.email, authState.user.name])

  return (
    <UserForm withEditIcons={true} values={loadedUserData} submitAction="Сохранить" onSubmit={handleSubmit}></UserForm>
  )
}
