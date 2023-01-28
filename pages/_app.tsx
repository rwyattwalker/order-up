import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import { ShoppingCartProvider } from '../context/ShoppingCartContext'

export default function App({ Component, pageProps }: AppProps) {
  return(
  <ShoppingCartProvider>
    <Navbar hamburger ={false} getStarted dark/>
    <Component {...pageProps} />
  </ShoppingCartProvider>
  )
}
