import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'

type props = {
  id:number,
  plan: string,
  headerText: string,
  price: number,
  bullets: string[],
  classes?: string,
  fee: number,
  text: string,
}

function PriceBundleContainer({plan, headerText, price, bullets, classes, fee, text, id}:props) {
  const {increaseCartQuantity} = useShoppingCart()
  return (
    <div className={`${classes && classes} flex flex-col my-auto bg-white rounded-md drop-shadow-lg min-h-[425px] w-[350px] md:w-full max-w-[725px] xl:max-w-4xl mx-auto pb-2 text-center border-[#F5F5F5] border-2 mb-10`}>
      
      <div className='bg-[#EB9B2F] font-bold text-lg text-white w-[100%] text-center rounded-t'>Most Popular</div> 
      <h1 className='font-bold text-2xl mb-3 md:hidden mt-8'>{plan}</h1>
      <div className='flex flex-col md:flex-row h-full gap-4'>
        <div className='flex flex-col w-full md:w-1/2 my-auto'>
          <h1 className='font-bold text-2xl mb-3 hidden md:inline'>{plan}</h1>
          <h2 className='mt-2 mb-3'><span className='font-bold text-3xl'>{`${price}`}</span>&nbsp;/month</h2>
          <p className='mb-2'><span className='font-bold text-lg'>{`${fee}`}</span>&nbsp; set up fee</p>
          <p className='my-4 mx-2'>
            Our best deal for the 21st Century Food Truck! Includes everything from the <span className='font-semibold'>Premium Web</span> and <span className='font-semibold'>Mobile Ordering</span> Packages, for a reduced cost and setup fee.
          </p>
        
          <button onClick={()=>increaseCartQuantity(id, plan, fee, price)} className='py-3 px-4 rounded-full bg-[#97BBAF] my-3 font-semibold mx-4'>Add to Order</button>
        </div>
        <div className='separator h-[80%] w-[80%] md:w-[1px] flex flex-col md:flex-row my-auto mx-auto md:mx-0'></div>
        <div className='flex flex-col mx-auto'>
            {/* <div>Our best deal for the digital friendly food truck, includes:</div> */}
            <ul className='list-none my-auto '>
            {bullets.map((e,i) => {
              return(
              <div className='flex my-1 gap-2 font-semibold' key={i}>
                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <li>{e}</li>
              </div>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PriceBundleContainer