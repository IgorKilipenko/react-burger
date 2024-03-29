import React from "react"
import { UserForm, UserFormDataState } from "../../components/user-form"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { authActions, getAuthStore } from "../../services/slices/auth"

export const ProfilePage = React.memo(() => {
  const lockRef = React.useRef(false) /// Needed in strict mode for ignore synthetic/fast rerender
  const authState = useAppSelector(getAuthStore)
  const dispatch = useAppDispatch()
  const [enableForceSubmit, setEnableForceSubmit] = React.useState(false)
  const changedItemsRef = React.useRef<Partial<UserFormDataState>>({})

  const handleSubmit = React.useCallback(
    (userData: UserFormDataState) => {
      if (lockRef.current === false) {
        lockRef.current = true

        const data = Object.entries(changedItemsRef.current).reduce<Partial<Record<keyof UserFormDataState, string>>>(
          (res, [key, val]) => {
            const currVal = val.isValid ? val.value : undefined
            if (currVal) {
              res[key as keyof UserFormDataState] = currVal
            }
            return res
          },
          {}
        )

        console.assert(
          Object.entries(data).every(([key, val]) => val === userData[key as keyof UserFormDataState]?.value)
        )

        dispatch(authActions.updateUser(data))
      }
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

  const handleValidated = React.useCallback(
    (args: { name?: string; value: string; isValid: boolean }) => {
      const itemKey = args.name as keyof UserFormDataState
      if (loadedUserData?.[itemKey] !== args.value) {
        changedItemsRef.current[itemKey] = { isValid: args.isValid, value: args.value }
      } else if (changedItemsRef.current[itemKey]) {
        delete changedItemsRef.current[itemKey]
      }

      const isValid =
        Object.keys(changedItemsRef.current).length > 0 &&
        Object.entries(changedItemsRef.current).every(([Key, val]) => {
          return val?.isValid
        })

      setEnableForceSubmit(isValid)
    },
    [loadedUserData]
  )

  return (
    <UserForm mt={28}
      withEditIcons={true}
      values={loadedUserData}
      submitAction={enableForceSubmit ? "Сохранить" : null}
      resetAction={enableForceSubmit ? "Отменить" : null}
      onSubmit={handleSubmit}
      onValidated={handleValidated}
      forceSubmit={enableForceSubmit}
      actionsContainerOptions={{ justify: "end", w:"100%" }}
    />
  )
})
