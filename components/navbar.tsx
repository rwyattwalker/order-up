import Link from 'next/link'
import React, { useEffect } from 'react'
import {GiHamburgerMenu} from "react-icons/gi"
import {useState} from "react"
import Image from "next/image"

type propTypes = {
  hamburger: boolean,
  home?: boolean,
  dark?: boolean
}

function Navbar({hamburger, home, dark}:propTypes) {
  const [open, setOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<null | number>(null);
  useEffect(()=>{
    setViewportHeight(window.innerHeight)
  },[])
  const handleToggle = () => {
    if(open){
      setOpen(false)
    }else{
      setOpen(true)
    }
  }
  return(<>
    {!hamburger &&
      <div className='w-100 m font-bold text-lg text-white bg-transparent flex justify-between z-[50000] pointer-events-auto'>
        <Link className='hover:cursor-pointer my-auto' href={"/"}>
          <Image src={`${dark ? '/hamburger-black.png' : '/hamburger-white.png'}`} width={50} height={50} alt="logo" />
        </Link>
        <div className='flex gap-8'>
          <Link href={"/pricing"} className={`${dark && 'text-black'} my-auto cursor-pointer scroll-smooth`}>Pricing</Link>
          <Link href={"/#form"} >
            <button className="bg-[#EB9B2F] text-white rounded-full font-bold py-2 px-4 cursor-pointer pointer-events-none">Get Started</button>
          </Link>
        </div>
      </div>
    }
    {hamburger &&
      <div className='w-full  font-bold text-lg text-white bg-[#97BBAF] flex justify-between fixed z-[50000]'>
        <Link className='hover:cursor-pointer my-auto mx-2 flex' href={"/"}>
          <Image src="/hamburger-white.png" width={50} height={50} alt="logo" />
          <div className='my-auto text-xl font-bold'>| ORDER UP</div>
        </Link>
        <GiHamburgerMenu className={`text-3xl z-50 m-5 ${open ? 'text-white': 'text-white'}`} onClick={handleToggle}/>
        {open &&
          <div className='flex flex-col z-20 absolute top-0 w-full h-fit bg-[#97BBAF]'>
            <Link href={"/pricing"} className="my-auto text-white font-bold py-2 px-4 w-fit">Pricing</Link>
            <Link href={"/#form"} className=" text-white font-bold py-2 px-4">Get Started</Link>
          
          </div>
        }
      </div>
    }
 </> )
}

export default Navbar