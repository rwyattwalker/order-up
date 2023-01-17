import React from 'react'
import Navbar from '../components/navbar'
import PricingContainer from '../components/pricingContainer'

function pricing() {
  return (
   <section className='w-full min-h-[100vh] text-center  bg-[#E8E8E8]'>
    <div className='flex flex-col justify-center min-h-[100vh] gap-4 max-w-[1400px] mx-auto'>
      <Navbar hamburger={false} dark/>
      <h1 className='font-bold text-3xl' >Flexible plans designed with your needs in mind.</h1>
      <p className='max-w-3xl mx-auto'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas voluptatibus, veritatis voluptates iure nisi cumque expedita veniam fuga eius deleniti autem ullam sequi nostrum error repellat dolorem vel porro delectus.</p>
        <div className='flex justify-center gap-4'>
          <PricingContainer text={"A mobile-optimized, preset website with seamless content management and SEO best practices built in."} classes={"mt-10"} plan={"Digital Essentials"} headerText={"Sign up for the basic plan."} price={"$119"} fee={"$900"} bullets={["Custom Website", "Real Time Location Display", "SEO Optimization", "Content Management System"]} />
          <PricingContainer text={"Digital storefront custom-designed to elevate your brand. Includes built-in marketing and commerce tools."} fee={"$1200"} plan={"Digital Plus"} headerText={"Sign up for the basic plan."} price={"$150"} bullets={["Custom Website", "Real Time Location Tracking"]} />
          <PricingContainer text={"Sell and manage to-go orders directly on your website."} fee={"$799"} plan={"Mobile Ordering"} headerText={"Sign up for the basic plan."} price={"$150"} bullets={["Custom Website", "Real Time Location Tracking"]} />
          <PricingContainer text={"From patio buyouts to weddings, birthdays, and more, our platform makes it easy for diners to book"} fee={"$100"} classes={"mt-10"} plan={"Event Booking"} headerText={"Sign up for the basic plan."} price={"$150"} bullets={["Custom Website", "Real Time Location Tracking"]} />
        </div>
     </div>
    </section>
  )
}

export default pricing