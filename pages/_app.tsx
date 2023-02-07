import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import { ShoppingCartProvider } from '../context/ShoppingCartContext'
import ClientOnly from '../components/ClientOnly'

export default function App({ Component, pageProps }: AppProps) {
  return(
  <ShoppingCartProvider>
    <ClientOnly>
       <div className='hidden sm:inline'>
        <Navbar hamburger={false} getStarted dark shoppingCart={typeof window != "undefined" && window.location.href.indexOf('checkout') > -1 ? false : true} />
      </div>
    </ClientOnly>
   <ClientOnly>
     <div className='sm:hidden'>
      <Navbar hamburger={true} getStarted dark shoppingCart={typeof window != "undefined" && window.location.href.indexOf('checkout') > -1 ? false : true}/>
    </div>
   </ClientOnly>
    <Component {...pageProps} />
  </ShoppingCartProvider>
  )
}
