import React from 'react'
import {ImCross} from 'react-icons/im'
import { useShoppingCart } from '../context/ShoppingCartContext'
import Link from 'next/link'
import Image from 'next/image'



function Cart() {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  const {cartItems, visible, closeCart} = useShoppingCart()
  return (
    <div className={`${visible ? "" : "hidden"} p-4 z-[9999999999999999999] text-black right-1  top-[75px] sm:top-[70px] sm:right-0 w-[90vw] sm:w-[500px] absolute bg-white rounded border-l-gray-300 flex flex-col`}>
      <h1 className='font-bold text-2xl text-center'>My Order</h1>
      {cartItems.length == 0 && 
        <h2 className='font-[500] text-lg text-center mb-1'>Your have no services selected</h2>
      }
      {cartItems &&
        cartItems.map((e,i)=> {
          return <div key={i} className='w-full my-1 border-t border-gray-300 flex justify-start h-fit'>
          <div className='flex flex-col my-auto w-44'>
            <h2 className='font-[500] text-lg text-left'>{e.name}</h2>
            <p className='text-xs font-[500] text-gray-500'>{e.price} <span className=''>/month</span>, {e.fee} set up fee</p>
          </div>
          <div className='flex text-center ml-auto'>
            <button onClick={()=> decreaseCartQuantity(e.id)} className='bg-gray-200 h-[92%] my-auto px-4 rounded text-center'>-</button>
            <p className='h-fit w-12 px-4 my-auto'>{e.quantity}</p>
            <button onClick={()=> increaseCartQuantity(e.id, e.name, e.price, e.fee)} className='bg-gray-200 h-[92%] my-auto px-4 rounded text-center'>+</button>
          </div>
          <button onClick={()=> removeFromCart(e.id)} className='my-auto text-lg text-gray-300 ml-auto cursor-pointer'>
            <ImCross className='ml-2 '/>
          </button>
        </div>
        })
      }
     
      <Link className={`mt-auto py-2 w-full flex justify-center ${cartItems.length == 0 ? 'bg-gray-400 pointer-events-none' : 'bg-black'}  rounded text-white font-semibold text-center text-lg`} href={'/checkout'}>
        <button className='flex' onClick={closeCart}>Checkout&nbsp;<Image src={'/hamburger-white.png'} alt="Order Up Logo" width={30} height={25} /></button>
      </Link>
    </div>
  )
}

export default Cart