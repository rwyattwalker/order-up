import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '../components/navbar'
import Service from '../components/service'
import { use, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

type formResType = {
  success: boolean
}

export default function Home() {
  const [formState, setFormState] = useState({
    fname:'',
    lname: '',
    cname:'',
    country:'',
    email:'',
    phone:'',
    preferredContact:'',
    message:''
  })
  
  const [formRes, setFormRes] = useState<formResType|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e:any, value:any) => {
    let current:any = formState;
    current[value] = e.target.value;
    setFormState(current);
    console.log(formState);
  }
  async function handleSubmit(e:any) {
    e.preventDefault();
    setLoading(true)
    const response = await fetch("/api/form", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formState)
    });
    const json = await response.json();
    setLoading(false)
    setFormRes(json)
  }
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
            <Navbar hamburger={false} home/>
          </div>
          <div className='sm:hidden'>
            <Navbar hamburger={true} home/>
          </div>
          <div className='flex flex-col h-full justify-center pointer-events-none '>
            <div className='flex flex-col gap-3 md:flex-col lg:my-auto main-title justify-center'>
              <div className='text-center mt-20'>ORDER UP</div>
              <div className='text-xl mx-auto mb-10'>Digital Solutions for Your Food Truck</div>
            </div>
            
            <div className="md:my-auto w-full mx-auto">
                <Image
                className=""
                src="/foodtruck.png"
                alt="Cute Robot"
                width={800}
                height={800}
                priority
              />
            </div> 
          </div> 
        </div>
      </main>
      <section className='min-h-[75vh] -mt-40 pb-10 h-fit flex flex-col bg-[#5C4934]'  id="services">
       
        <div className=' h-fit mt-auto md:mx-20 lg:mx-44 flex flex-col flex-wrap xl:flex-nowrap md:flex-row lg:gap-4 justify-center text-white'> 
        {/* <div className='w-80 flex flex-col mt-16 text-center rounded-md mx-auto lg:mx-0'>
          <h1 className="font-bold text-3xl underline">Services</h1>
          <p className='text-lg'>We offer a full range of services to take your website or app from an idea to fruition. Wether you need one or all of the services we provide, if it&apos;s on the web, we&apos;ve got you covered. 
          </p>
        </div> */}
        <div className='md:basis-[100%] xl:hidden'></div>
          <div className='flex flex-col max-w-md my-auto'>
            <h1 className='font-bold text-3xl my-3'>WHAT WE DO</h1>
            <p className='font-semibold'>We take the digital hassle out of your food truck business.
              By providing you with a custom designed top tier website, 
              online ordering, and the latest technological features available, 
              we allow you to focus on what really matters, your customers.
            </p>
            <button className='mr-auto py-2 px-4 rounded-full bg-amber-500 my-3 font-semibold'>
              Get Started
            </button>
          </div>
          {/* <Service name={"Design"} /> */}
          {/* <Service name={"Develop"} /> */}
        <div className='md:basis-[100%] xl:hidden'></div>
          <Image src={"/3DTruck.png"} width={500} height={500} alt="Food Truck Graphic"/>
        </div>
      </section>
      <section className='h-fit bg-[#E8E8E8]  flex justify-center'>
        <div className=' bg-[#323732] w-[80%] lg:w-[60%] h-fit my-5'>
          <form id="#form" className='flex flex-col m-12 gap-4 text-black' onSubmit={handleSubmit}>
            {loading &&
            <div className='h-[391px] flex'>
              <div className='flex my-auto mx-auto'>
                <CircularProgress className=''/>
              </div>
            </div>
           
            }
            {formRes && formRes.success == true && 
            <div className='h-[391px] flex text-center md:text-left text-white'>
             <div className='flex-col my-auto'>
                <h1 className='mx-auto md:ml-0 w-fit font-bold text-5xl mb-2'>Thank you!</h1>
                <h2 className='my-auto mx-auto w-fit font-bold relative mb-2'>
                We have received your submission and are looking it over. We will reach out to you within 24 hours via your preferred contact method.
              </h2>
              <button type="button" className='py-2 px-4 bg-blue-600 rounded-sm font-bold text-white' onClick={() =>setFormRes(null)}>Submit another message</button>
              </div>
               <Image 
                className="hidden md:inline"
                src="/robot-reading.png"
                alt="Cute Robot"
                width={250}
                height={600}
                priority
              />
            </div>
          }
          {formRes == null && !loading &&
          <>
            <h1 className='font-bold text-3xl text-white'>Ready to Get Started?</h1>
            <div className='flex flex-col lg:flex-row gap-4'>
              <input type="text" id="fname" onChange={(e)=>handleChange(e,"fname")} name="fname" placeholder=" First Name" className="lg:w-1/3 h-10 rounded-sm"/>
              <input type="text" id="lname" onChange={(e)=>handleChange(e,"lname")} name="lname" placeholder=" Last Name" className="lg:w-1/3 h-10 rounded-sm"/>
              <input type="text" id="country" onChange={(e)=>handleChange(e,"country")} name="country" placeholder=" Country" className="lg:w-1/3 h-10 rounded-sm"/>
            </div>
            <div className='flex flex-col lg:flex-row gap-4'>
              <input type="text" id="cname" onChange={(e)=>handleChange(e,"cname")} name="cname" placeholder=" Company Name" className="lg:w-1/3  h-10 rounded-sm"/>
              <input type="text" id="email" onChange={(e)=>handleChange(e,"email")} name="email" placeholder=" Email" className="lg:w-1/3 h-10 rounded-sm"/>
              <input type="text" id="phone" onChange={(e)=>handleChange(e,"phone")} name="phone" placeholder=" Phone" className="lg:w-1/3 h-10 rounded-sm"/>
            </div>
            
            <textarea style={{color:"black !important"}} rows={6} cols={3} id="message" onChange={(e)=>handleChange(e,"message")} name="message" className='rounded-sm p-2' placeholder="Message" />
            <div className='flex flex-col sm:flex-row text-white'>
              Preferred Contact Method:&nbsp;
              <div className='flex'>
                <input type="radio" id="via_email" onChange={(e)=>handleChange(e,"preferredContact")} value="email" name="fav_contact" />
                <label htmlFor="via_email" className='mx-1'>Email</label>

                <input type="radio" id="via_phone" onChange={(e)=>handleChange(e,"preferredContact")} value="phone" name="fav_contact" />
                <label htmlFor="via_phone" className='mx-1'>Phone</label>
              </div>
             
            </div>
            <button  type="submit" className='py-2 px-4 bg-[#97BBAF] lg:w-44 text-white font-bold rounded-sm'>Submit</button>
            </>
          }

          </form>
          <div id="form" className='w-full bg-transparent'></div>
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
