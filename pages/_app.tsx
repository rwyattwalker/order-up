import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import { ShoppingCartProvider } from '../context/ShoppingCartContext'

export default function App({ Component, pageProps }: AppProps) {
  return(
  <ShoppingCartProvider>
    <div className='hidden sm:inline'>
      <Navbar hamburger={false} getStarted dark shoppingCart/>
    </div>
    <div className='sm:hidden'>
      <Navbar hamburger={true} getStarted dark />
    </div>
    <Component {...pageProps} />
  </ShoppingCartProvider>
  )
}
