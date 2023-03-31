import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import AppHeader from "../app-header"
import theme from "../../theme/theme"
import { useTheme } from "@chakra-ui/react"
import { Container, type ContainerProps } from "@chakra-ui/react"

const MainContainer: React.FC<ContainerProps> = ({ children, ...otherProps }) => {
  const {
    sizes: { container },
  } = useTheme()
  const props = { ...otherProps, maxWidth: container.xl }
  return <Container {...props}>{children}</Container>
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainContainer>
        <AppHeader />
      </MainContainer>
    </ChakraProvider>
  )
}

export default App
