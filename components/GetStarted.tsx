import React from 'react'
import Link from 'next/link'

function GetStarted() {
  return (
    <Link className='mr-auto' href={'/pricing'}><button className='py-2 px-4 mt-2 bg-orange-500 w-44 rounded-full text-white font-semibold'>Get Started</button></Link>
  )
}

export default GetStarted