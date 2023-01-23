import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '../components/navbar'
import Service from '../components/service'
import { use, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import ClientOnly from '../components/ClientOnly'
import Link from 'next/link'

type formResType = {
  success: boolean
}

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>Digital Solutions for Food Trucks | Order Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Digital Solutions for Food Trucks | Order Up" />
        <meta property="og:image" content="/evolve-white.png" />
        <link rel="icon" href="/favicon.ico" />
      
      </Head>
      <main className="h-[100vh] flex justify-center custom-bg">
        <div className='xl:my-24 2xl:mx-[20rem] xl:mx-[12rem] lg:mx-[10rem] md:my-20 sm:mt-10 sm:mx-[2rem] flex flex-col'>
          <div className='hidden sm:inline'>
            <ClientOnly>
              <Navbar hamburger={false} home getStarted />
            </ClientOnly>
          </div>
          <div className='sm:hidden'>
            <ClientOnly>
              <Navbar hamburger={true} home/>
            </ClientOnly>
          </div>
          <div className='flex flex-col h-full justify-center pointer-events-none '>
            <div className='flex flex-col gap-3 md:flex-col lg:my-auto main-title justify-center'>
              <div className='text-center mt-20'>ORDER UP</div>
              <div className='text-xl mx-4 font-[500] mb-10 text-center'>Digital Solutions for Your Food Truck</div>
            </div>
            
            <div className="md:my-auto w-full mx-auto">
                <Image
                className="ml-auto"
                src="/foodtruck.png"
                alt="Cute Robot"
                width={700}
                height={800}
                priority
              />
            </div> 
          </div> 
        </div>
      </main>
      <section className='min-h-[400px] sm:min-h-[70vh] -mt-[250px] sm:-mt-46 pb-10 h-fit flex flex-col bg-[#5C4934]'  id="services">
       
        <div className='h-fit mx-auto mt-40 md:mx-20 lg:mx-44 flex flex-col flex-wrap xl:flex-nowrap md:flex-row lg:gap-4 justify-center text-white'> 
        {/* <div className='w-80 flex flex-col mt-16 text-center rounded-md mx-auto lg:mx-0'>
          <h1 className="font-bold text-3xl underline">Services</h1>
          <p className='text-lg'>We offer a full range of services to take your website or app from an idea to fruition. Wether you need one or all of the services we provide, if it&apos;s on the web, we&apos;ve got you covered. 
          </p>
        </div> */}
        <div className='md:basis-[100%] xl:hidden'></div>
          <div className='flex flex-col max-w-md my-auto mx-2'>
            <h1 className='font-[600] text-3xl my-3'>WHAT WE DO</h1>
            <p className='font-[500]'>We take the digital hassle out of your food truck business.
              By providing you with a custom designed top tier website, 
              online ordering, and the latest technological features available, 
              we allow you to focus on what really matters, your customers.
            </p>
            <Link className='w-full sm:w-fit mr-auto py-3 sm:py-2 px-4 rounded-full bg-amber-500 my-3 font-semibold' href={'/pricing'}>
             Get Started
           </Link>
          </div>
          {/* <Service name={"Design"} /> */}
          {/* <Service name={"Develop"} /> */}
        <div className='md:basis-[100%] xl:hidden'></div>
          <Image src={"/3DTruck.png"} width={500} height={500} alt="Food Truck Graphic" className='hidden sm:inline'/>
        </div>
      </section>
      <section className='min-h-[60vh] pb-10 h-fit flex flex-col bg-[#323732]'  id="services">
       
        <div className=' h-fit mx-auto md:mx-20 lg:mx-44 flex flex-col flex-wrap xl:flex-nowrap md:flex-row lg:gap-4 justify-center text-white'> 
        {/* <div className='w-80 flex flex-col mt-16 text-center rounded-md mx-auto lg:mx-0'>
          <h1 className="font-bold text-3xl underline">Services</h1>
          <p className='text-lg'>We offer a full range of services to take your website or app from an idea to fruition. Wether you need one or all of the services we provide, if it&apos;s on the web, we&apos;ve got you covered. 
          </p>
        </div> */}
        <div className='md:basis-[100%] xl:hidden'></div>
        <Image src={"/website.png"} width={500} height={500} alt="Food Truck Graphic"/>
     
          {/* <Service name={"Design"} /> */}
          {/* <Service name={"Develop"} /> */}
        <div className='md:basis-[100%] xl:hidden'></div>
               <div className='flex flex-col max-w-md my-auto mx-2'>
            <h1 className='font-bold text-3xl my-3'>RISE ABOVE THE CROWD</h1>
            <p className='font-[500]'>Showcase your unique brand and menu with a fully custom website.
            Increase visibility and reach a larger audience by taking advantage of the latest search engine optimizations. 
            Integrate your website with social media and location tracking to connect with customers in real-time and drive sales. 
            </p>
            <Link className='w-full sm:w-fit mr-auto py-3 sm:py-2 px-4 rounded-full bg-amber-500 my-3 font-semibold' href={'/pricing'}>
             Get Started
           </Link>
          </div>
        </div>
      </section>
      <section className='min-h-[60vh] pb-10 h-fit flex flex-col bg-[#323732] -mt-1'  id="services">
       
       <div className=' h-fit mx-auto md:mx-20 lg:mx-44 flex flex-col-reverse sm:flex-col flex-wrap xl:flex-nowrap md:flex-row lg:gap-4 justify-center text-white'> 
       {/* <div className='w-80 flex flex-col mt-16 text-center rounded-md mx-auto lg:mx-0'>
         <h1 className="font-bold text-3xl underline">Services</h1>
         <p className='text-lg'>We offer a full range of services to take your website or app from an idea to fruition. Wether you need one or all of the services we provide, if it&apos;s on the web, we&apos;ve got you covered. 
         </p>
       </div> */}
       <div className='md:basis-[100%] xl:hidden'></div>
         <div className='flex flex-col max-w-md my-auto mx-2'>
           <h1 className='font-bold text-3xl my-3'>DELIVER EXPERIENCE</h1>
           <p className='font-[500]'>Deliver a flawless customer experience with online ordering via your own website. 
           Allow customers to easily place orders at the restaurant or on the go, increasing convenience and driving sales.
           We handle the ordering so you can focus on the customer. &quot;Order Up!&quot;
          
           </p>
           <Link className='w-full sm:w-fit mr-auto py-3 sm:py-2 px-4 rounded-full bg-amber-500 my-3 font-semibold' href={'/pricing'}>
             Get Started
           </Link>
         </div>
         {/* <Service name={"Design"} /> */}
         {/* <Service name={"Develop"} /> */}
       <div className='md:basis-[100%] xl:hidden'></div>
         <Image src={"/ui-menus.png"} width={500} height={500} alt="Food Truck Graphic"/>
       </div>
     </section>
      <section className='h-fit bg-[#E8E8E8]  flex justify-center'>
        <div className=' bg-[#323732] w-[95%] sm:w-[80%] lg:w-[60%] h-44 flex flex-col sm:flex-row justify-between rounded-full my-5'>
         <h1 className='my-auto text-white text-5xl font-semibold mx-auto sm:ml-10 sm:mr-0'>Questions?</h1>
         <Link href={'/contact'} className='my-auto'>
            <h1 className='my-auto text-white text-4xl font-semibold mx-auto sm:mr-10 sm:ml-0 bg-[#97BBAF] py-4 px-5 w-fit rounded-full'>Contact Us</h1>
         </Link>
        </div>
      </section>
    </div>
  )
}

export async function getStaticProps(){
  return{
    props:{}
  }
}
