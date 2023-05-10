import React from "react"
import { CircularProgress, Flex } from "@chakra-ui/react"
import { Navigate, useLocation } from "react-router-dom"
import { getAuthStore } from "../../services/slices/auth"
import { useAppSelector } from "../../services/store"

export type ProtectedRouteAccessType = "withAuth" | "withoutAuth"

export interface ProtectedRouteProps {
  accessType?: ProtectedRouteAccessType
  element: React.ReactElement
  redirectPath?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  accessType = "withAuth",
  element,
  redirectPath = accessType === "withAuth" ? "/login" : "/",
}) => {
  const authState = useAppSelector(getAuthStore)
  const location = useLocation()
  const targetPathRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (accessType === "withAuth" && !authState.loading && !authState.isAuthenticatedUser) {
      targetPathRef.current = redirectPath
    }
  }, [accessType, authState.isAuthenticatedUser, authState.loading, redirectPath])

  const loader = React.useMemo(
    () => (
      <Flex align="center" justify="center" grow={1}>
        <CircularProgress isIndeterminate color="accent-color" />
      </Flex>
    ),
    []
  )

  const redirectWithAuth = React.useMemo(() => {
    if (authState.isAuthenticatedUser) {
      if (!targetPathRef.current) {
        return element
      } else {
        const forceRedirectPath = targetPathRef.current
        targetPathRef.current = null
        return <Navigate to={forceRedirectPath} replace />
      }
    } else {
      return <Navigate to={redirectPath} state={{ targetAfterAuth: location.pathname }} replace />
    }
  }, [authState.isAuthenticatedUser, element, location.pathname, redirectPath])

  const redirectWithoutAuth = React.useMemo(() => {
    return !authState.isAuthenticatedUser ? element : <Navigate to={redirectPath} />
  }, [authState.isAuthenticatedUser, element, redirectPath])

  return authState.loading ? loader : accessType === "withAuth" ? redirectWithAuth : redirectWithoutAuth
}
