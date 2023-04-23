import { FlexProps } from "@chakra-ui/react"

export type WithoutIntersect<T, V> = { [K in keyof T]: T[K] extends V ? never : K }[keyof T]

export type SelectProps<T extends {}, K extends keyof T> = Omit<T, keyof Omit<T, K>>
export type SelectFlexProps<K extends keyof FlexProps> = SelectProps<FlexProps, K>
export type OmitFlexProps<K extends keyof FlexProps> = Omit<FlexProps, K>
