import type {
  BoxProps as ChakraBoxProps,
  FlexProps,
  FlexboxProps,
  HTMLChakraProps,
  LayoutProps,
  SpaceProps,
} from "@chakra-ui/react"

export type { LayoutProps } from "@chakra-ui/react"

export type WithoutIntersect<T, V> = { [K in keyof T]: T[K] extends V ? never : K }[keyof T]
export type WithRequired<T extends {}, K extends keyof T> = Omit<T, K> & Required<SelectProps<T, K>>

export type SelectProps<T extends {}, K extends keyof T> = Omit<T, keyof Omit<T, K>>
export type SelectFlexProps<K extends keyof FlexProps> = SelectProps<FlexProps, K>
export type OmitFlexProps<K extends keyof FlexProps> = Omit<FlexProps, K>

export type FlexOptions = Omit<FlexProps, keyof HTMLChakraProps<"div">>
export type OmitFlexOptions<K extends keyof FlexOptions> = Omit<FlexOptions, K>
export type FlexContainer = FlexOptions & FlexboxProps & SpaceProps & LayoutProps

export type BoxProps = ChakraBoxProps
export type BoxOptions = Omit<ChakraBoxProps, keyof HTMLChakraProps<"div">>

export type Nullable<T> = { [P in keyof T]: T[P] | null }
export type WithoutNullableKeys<T> = {
  [K in keyof T]: WithoutNullableKeys<NonNullable<T[K]>>
}

export type FilterProps<T extends {}, V> = { [K in keyof T]: T[K] extends V ? T[keyof T] : never }

export type TypeWithGeneric<T> = T[]
export type ExtractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never
