import {
  Flex,
  FormControl,
  type FormControlProps,
  type HTMLChakraProps,
} from "@chakra-ui/react"
import { Form as RoutingForm, type FormProps as RoutingFormProps } from "react-router-dom"
import { FlexOptions } from "../../../utils/types"

export type FormControlOptions = Omit<FormControlProps, keyof HTMLChakraProps<"div">>

export interface FormProps extends Omit<RoutingFormProps, "children"> {
  children?: RoutingFormProps["children"]
  options?: {
    container: FlexOptions
    control?: FormControlOptions
  }
}

export const Form: React.FC<FormProps> = ({ children, ...props }) => {
  const formControlOptions = props.options?.control ?? {}
  const formProps = props as RoutingFormProps
  return (
    <Flex>
      <FormControl as="div" {...formControlOptions}>
        <RoutingForm {...formProps}>{children}</RoutingForm>
      </FormControl>
    </Flex>
  )
}
