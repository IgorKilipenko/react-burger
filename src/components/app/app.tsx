import { ChakraProvider } from '@chakra-ui/react'
import AppHeader from '../app-header'
import theme from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppHeader />
    </ChakraProvider>
  )
}

export default App
