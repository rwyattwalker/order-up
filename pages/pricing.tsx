import React from 'react'
import Navbar from '../components/navbar'
import PricingContainer from '../components/pricingContainer'
import PriceBundleContainer from '../components/priceBundleContainer'
import Cart from '../components/Cart'
import ClientOnly from '../components/ClientOnly'

export default function Pricing() {
    return (
    <>
   <section className='w-[100vw] max-w-[100vw] overflow-x-hidden min-h-[100vh] text-center  bg-[#E8E8E8] flex'>
    <div className='flex flex-col justify-center min-h-[100vh] gap-4 mx-auto mt-12'>
      <div className='max-w-md md:max-w-4xl flex mx-auto flex-col '>
         <h1 className='font-bold text-3xl mt-12 md:mt-16 2xl:mt-20 text-center' >Flexible plans designed with your needs in mind.</h1>
        <p className=' lg:max-w-3xl mx-2 sm:mx-auto text-center'>
          Our plans are designed to make it easy and affordable to get the digital presence you need. Want to talk first? 
        </p>
        <button className='py-2 px-4 bg-pastel-green rounded-lg inline w-fit text-white font-semibold mx-auto mt-1'>Contact Us</button>
      </div>
        <div className='grid grid-cols-1 md:grid-cols-2 md:max-w-[725px] 2xl:max-w-none 2xl:grid-cols-4 justify-center gap-5 mt-5 mb-5 mx-auto' >
          <PricingContainer id={1} text={"A mobile-optimized, preset website with seamless content management and SEO best practices built in."} classes={"2xl:mt-10"} plan={"Basic Web"} headerText={"Sign up for the basic plan."} price={"$99"} fee={"$999"} bullets={["Custom Website", "Real Time Location Display", "SEO Optimization", "Content Management System"]} />
          <PricingContainer id={2} text={"Digital storefront custom-designed to elevate your brand. Includes built-in marketing and commerce tools."} classes={"2xl:-mt-1"} fee={"$1199"} plan={"Premium Web"} headerText={"Sign up for the basic plan."} price={"$199"} bullets={["Custom Website", "Real Time Location Tracking"]} />
          <PricingContainer id={3} text={"Sell and manage to-go orders directly on your website. Keep all of your profits with our commission free software."} fee={"$499"} plan={"Mobile Ordering"} classes={"2xl:-mt-1"} headerText={"Sign up for the basic plan."} price={"$69"} bullets={["Custom Website", "Real Time Location Tracking"]} />
          <PricingContainer id={4} text={"From patio buyouts to weddings, birthdays, and more, our platform makes it easy for diners to book"} fee={"$199"} classes={"2xl:mt-10"} plan={"Event Booking"} headerText={"Sign up for the basic plan."} price={"$49"} bullets={["Custom Website", "Real Time Location Tracking"]} />
        </div>
          <div className='font-bold text-4xl'>Bundle & Save!</div>
          <PriceBundleContainer id={5} text={"Our best deal for the 21st Century Food Truck! Includes everything from the Premium Web, Mobile Ordering, and Event Booking Packages, all for one low price."} fee={"$1499"} classes={"2xl:mt-10"} plan={"Order Up Bundle!"} headerText={"Sign up for the basic plan."} price={"$249"} bullets={["Custom Website","Mobile Friendly", "SEO Optimization", "Real Time Location Tracking", "Accept and Manage Orders Online", "Easily Update Menu & Hours", "Yearly Site Redesign"]} />
     </div>
    </section>
    </>
  )
  
}