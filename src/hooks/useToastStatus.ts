import { AlertStatus, useToast } from "@chakra-ui/react"

const statuses: { [K in AlertStatus]: string } = {
  success: "успешно",
  error: "ошибка",
  warning: "внимание",
  info: "информация",
  loading: "загрузка",
}

export interface ToastStatusOptions {
  status: keyof typeof statuses
  message: string
  isClosable?: boolean | null
}

export const useToastStatus = (options?: { isClosable?: ToastStatusOptions["isClosable"] }) => {
  const toast = useToast()

  return ({ status, message }: Omit<ToastStatusOptions, "isClosable">) =>
    toast({
      title: `${statuses[status]} ${message}`,
      status: status,
      isClosable: options?.isClosable ?? true,
    })
}
