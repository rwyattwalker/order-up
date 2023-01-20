import React from 'react'

type props = {
  plan: String,
  headerText: String,
  price: String,
  bullets: String[],
  classes?: String,
  fee: String,
  text: String,
}

function PricingContainer({plan, headerText, price, bullets, classes, fee, text}:props) {
  return (
    <div className={`${classes && classes} flex flex-col my-auto bg-white rounded-md drop-shadow-lg h-[425px] w-[350px] px-2 py-2 text-center border-[#F5F5F5] border-2`}>
      <h1 className='font-bold text-2xl mt-12 mb-3'>{plan}</h1>
      <h2 className='mt-2 mb-3'><span className='font-bold text-3xl'>{`${price}`}</span>&nbsp;/month</h2>
      <p className='mb-2'><span className='font-bold text-lg'>{`${fee}`}</span>&nbsp; set up fee</p>
      <p className='my-4'>{text}</p>
      {/* <ul className='list-none'>
        {bullets.map((e,i) => {
          return(
          <div className='flex mx-2 gap-2 font-semibold' key={i}>
            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <li>{e}</li>
          </div>
          )
        })}
      </ul> */}
      <button className='py-3 px-4 rounded-full bg-[#97BBAF] my-3 font-semibold mx-4'>Get Started</button>
    </div>
  )
}

export default PricingContainer