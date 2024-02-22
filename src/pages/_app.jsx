import Layout from '@/components/layout'
import '@/styles/globals.css'
import { ChakraBaseProvider } from '@chakra-ui/react'
import theme from '../../chakra-theme'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (<ChakraBaseProvider theme={theme}><Layout> <Component {...pageProps} /></Layout></ChakraBaseProvider>)
}
