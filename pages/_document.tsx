import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <body className='scrollbar-hide bg-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
