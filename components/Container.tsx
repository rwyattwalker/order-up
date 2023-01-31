import React, {ReactNode} from 'react'
import Navbar from './navbar'

type Props = {
  children: ReactNode,
  dark?: boolean
  getStarted?: boolean
}

function Container({children, dark, getStarted}:Props) {
  return (
    <>
    <div className='bg-gray-200 min-h-screen flex'>
       <div className='flex flex-col mt-[70px] mx-auto md:mt-44 md:w-[750px] lg:w-[1000px] xl:w-[1200px] gap-2"'>
        {children}
      </div>
    </div>
   </>
  )
}

export default Container