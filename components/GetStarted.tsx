import React from 'react'
import Link from 'next/link'

function GetStarted() {
  return (
    <Link className='mx-auto sm:ml-0' href={'/pricing'}><button className='py-2 px-4 mt-2 bg-orange-500 w-[95vw] sm:w-44 rounded-full text-white font-semibold'>Get Started</button></Link>
  )
}

export default GetStarted