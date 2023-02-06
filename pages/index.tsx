/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import GetStarted from '../components/GetStarted'
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
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="icon" href="/favicon.ico" />
      
      </Head>
      <main className="min-h-[90vh] flex bg-offwhite text-black pb-10">
        <div className='xl:my-24 2xl:mx-[15rem] xl:mx-[12rem] lg:mx-[10rem] md:my-20 sm:mt-10 sm:mx-[2rem] flex flex-col w-full px-2 pt-20'>
          <div className='flex h-full justify-around pointer-events-none  flex-col-reverse sm:flex-row'>
            <div className='flex flex-col gap-3 md:flex-col lg:my-auto justify-center max-w-md'>
              <div className='text-4xl sm:text-5xl mb-1 smLmb-5 font-bold text-left'>Tech designed with food trucks in mind.</div>
              <p className='text-lg sm:text-xl mb-2 font-light sm:font-bold text-left'>Whether it&apos;s mobile ordering, website design and development, or a completely custom solution. 
              OrderUp provides food trucks with the tools to provide a superior customer experience.</p>
            <GetStarted />
            </div>
            
            <div className="md:my-auto w-full sm:w-[30vw] relative h-[50vh]">
                <Image
                className="ml-auto"
                src="/foodtruck-3.png"
                alt="Cute Robot"
                fill
                style={{objectFit:"contain"}}
                priority
              />
            </div> 
            </div>
        </div>
      </main>
      <section className='pb-20 h-fit flex flex-col bg-offwhite'  id="services">
       
        <div className='h-fit mx-auto mt-0 md:mx-20 lg:mx-44 flex flex-col flex-wrap xl:flex-nowrap md:flex-row lg:gap-4 justify-center text-black text-center'> 
          <div className='md:basis-[100%] xl:hidden'></div>
          <div className='flex flex-col max-w-xl my-auto mx-2'>
            <h1 className='font-[600] text-5xl sm:text-7xl my-3'>Why we do</h1>
            <div className='flex gap-2 sm:-ml-5'>
              <img src="/headshot.jpeg" className='w-24 h-24 rounded-full object-cover hidden' alt="Founder Photo" />
               <p className='font-[500] text-center'>I believe every food truck owner ought to have the tools to run a maximally successful and efficient business. 
               I founded OrderUp to simplify and amplify their success with efficient and effective ordering solutions and web platforms.
              </p>
            </div>
            <div className='flex relative justify-center mt-3'>
              <img className="w-24 h-auto md:w-28 md:h-auto rounded-full mx-auto absolute left-4 sm:left-12" src="/headshot.jpeg" alt=""  />
              <div className='flex flex-col my-auto mt-8'>
                <p className='font-semibold'>Wyatt Walker</p> 
                <p>Order Up Founder</p>
              </div>
            </div>
           
            <div className='mx-auto'>
            {/* <GetStarted /> */}
            </div>
          </div>
        <div className='md:basis-[100%] xl:hidden'></div>
          {/* <Image src={"/3DTruck.png"} width={500} height={500} alt="Food Truck Graphic" className='hidden sm:inline'/> */}
        </div>
      </section>
      <section className='min-h-[60vh] pb-10 h-fit flex flex-col bg-[#F6DEAF]'  id="services">
       
        <div className=' h-fit mx-auto md:mx-20 lg:mx-44 flex flex-col flex-wrap xl:flex-nowrap md:flex-row lg:gap-4 justify-center text-black my-auto'> 
        {/* <div className='w-80 flex flex-col mt-16 text-center rounded-md mx-auto lg:mx-0'>
          <h1 className="font-bold text-3xl underline">Services</h1>
          <p className='text-lg'>We offer a full range of services to take your website or app from an idea to fruition. Wether you need one or all of the services we provide, if it&apos;s on the web, we&apos;ve got you covered. 
          </p>
        </div> */}
        <div className='md:basis-[100%] xl:hidden'></div>
        <Image src={"/food-web.png"} width={500} height={500} alt="Food Truck Graphic"/>
     
          {/* <Service name={"Design"} /> */}
          {/* <Service name={"Develop"} /> */}
        <div className='md:basis-[100%] xl:hidden'></div>
               <div className='flex flex-col max-w-md my-auto mx-2'>
            <h1 className='font-bold text-3xl my-3'>RISE ABOVE THE CROWD</h1>
            <p className='font-[500]'>Showcase your unique brand and menu with a fully custom website.
            Increase visibility and reach a larger audience by taking advantage of the latest search engine optimizations. 
            Integrate your website with social media and location tracking to connect with customers in real-time and drive sales. 
            </p>
          <GetStarted /> 
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
          <GetStarted /> 
         </div>
         {/* <Service name={"Design"} /> */}
         {/* <Service name={"Develop"} /> */}
       <div className='md:basis-[100%] xl:hidden'></div>
         <Image src={"/mobile.png"} width={500} height={500} alt="Food Truck Graphic"/>
       </div>
     </section>
      <section className='h-fit bg-[#E8E8E8]  flex justify-center'>
        <div className=' bg-[#323732] w-[95%] sm:w-[80%] lg:w-[60%] h-44 flex flex-col sm:flex-row justify-between rounded-full my-5'>
         <h1 className='my-auto text-white text-5xl font-semibold mx-auto sm:ml-10 sm:mr-0'>Questions?</h1>
         <Link href={'/faq'} className='my-auto'>
            <h1 className='my-auto text-white text-2xl sm:text-4xl font-semibold mx-auto sm:mr-10 sm:ml-0 bg-[#97BBAF] py-4 px-5 w-fit rounded-full'>We&apos;ve got answers</h1>
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
