import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'

type props = {
  id: number,
  plan: string,
  headerText: String,
  price: String,
  bullets: String[],
  classes?: String,
  fee: String,
  text: String,
}

function PricingContainer({plan:name, headerText, price, bullets, classes, fee, text, id}:props) {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  return (
    <div key={id} className={`${classes && classes} flex flex-col my-auto bg-white rounded-md drop-shadow-lg h-[425px] w-[350px] px-2 py-2 text-center border-[#F5F5F5] border-2`}>
      <h1 className='font-bold text-2xl mt-12 mb-3'>{name}</h1>
      <h2 className='mt-2 mb-3'><span className='font-bold text-3xl'>{`${price}`}</span>&nbsp;/month</h2>
      <p className='mb-2'><span className='font-bold text-lg'>{`${fee}`}</span>&nbsp; set up fee</p>
      <p className='my-4'>{text}</p>
      <button onClick={()=>increaseCartQuantity(id, name)} className='py-3 px-4 rounded-full bg-[#97BBAF] my-3 font-semibold mx-4'>Add to Order</button>
    </div>
  )
}

export default PricingContainer