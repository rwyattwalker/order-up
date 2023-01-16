import Link from 'next/link'
import React, { useEffect } from 'react'
import {GiHamburgerMenu} from "react-icons/gi"
import {useState} from "react"
import Image from "next/image"

type propTypes = {
  hamburger: boolean,
  home?: boolean
}

function Navbar({hamburger, home}:propTypes) {
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
  if(!hamburger)return(
    <div className='w-100  font-bold text-lg text-white bg-transparent flex justify-between z-[50000] pointer-events-auto'>
      <Link className='hover:cursor-pointer my-auto' href={"/"}>
        <Image src="/evolve-white.png" width={50} height={50} alt="logo" />
      </Link>
      <div className='flex gap-8'>
        {!home && <Link href={"/#services"} className="my-auto cursor-pointer scroll-smooth">Pricing</Link>}
        {home && <button onClick={()=>{window.scrollTo({top:viewportHeight!, behavior:"smooth"})}} className="my-auto cursor-pointer">Pricing</button>}
        {/* <Link href={"/careers/sales-executive"} className="my-auto cursor-pointer">Careers</Link> */}
        {!home && <Link href={"/#form"} className="bg-white text-blue-500 font-bold py-2 px-4 cursor-pointer">Get Started</Link>}
        {home && <button className="bg-[#EB9B2F] text-white rounded-full font-bold py-2 px-4 cursor-pointer" onClick={()=>{window.scrollTo({top:viewportHeight! + 100, behavior:'smooth'})}}>Get Stared</button>}
      </div>
    </div>
  )
  else return(
    <div className='w-full  font-bold text-lg text-black bg-white flex justify-between fixed z-[50000]'>
      <Link className='hover:cursor-pointer my-auto mx-2 flex' href={"/"}>
        <Image src="/evolve-black.png" width={50} height={50} alt="logo" />
        <div className='my-auto text-xl font-bold'>| Order Up</div>
      </Link>
      <GiHamburgerMenu className={`text-3xl z-50 m-5 ${open ? 'text-blue-500' : 'text-black'}`} onClick={handleToggle}/>
      {open &&
        <div className='flex flex-col z-20 absolute top-0 w-full h-fit bg-white'>
          {home && <button onClick={()=>{
            window.scrollTo({top:viewportHeight!, behavior:"smooth"})
            setOpen(false)}} className="my-auto text-blue-500 font-bold py-2 px-4 w-fit">Pricing</button>}
          {!home && <Link href={"/#services"} className="my-auto text-blue-500 font-bold py-2 px-4 w-fit">Pricing</Link>}
           {/* <Link href={"/careers/sales-executive"} className="my-auto text-blue-500 font-bold py-2 px-4 w-fit">Careers</Link> */}
          {home && <button onClick={()=>{
            window.scrollTo({top:viewportHeight! + 2000, behavior:"smooth"})
            setOpen(false)}} className=" text-blue-500 font-bold py-2 px-4 w-fit">Get Started</button>}
          {!home && <Link href={"/#form"} className="bg-[#EB9B2F] text-blue-500 font-bold py-2 px-4">Get Started</Link>}
         
        </div>
      }
    </div>
  )
}

export default Navbar