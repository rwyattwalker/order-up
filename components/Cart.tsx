import React from 'react'
import {ImCross} from 'react-icons/im'
import { useShoppingCart } from '../context/ShoppingCartContext'



function Cart() {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  const {cartItems, visible} = useShoppingCart()
  return (
    <div className={`${visible ? "" : "hidden"} p-4 z-[9999999999999999999] top-24 right-44 min-h-[400px] min-w-[500px] fixed bg-white rounded border-l-gray-300 flex flex-col`}>
      <h1 className='font-bold text-2xl text-center'>My Cart</h1>
      {cartItems &&
        cartItems.map((e,i)=> {
          return <div key={i} className='w-full my-1 border-t border-gray-300 flex justify-start h-10'>
          <div className='flex flex-col my-auto w-44'>
            <h2 className='font-[500] text-lg'>{e.name}</h2>
          </div>
          <div className='flex text-center ml-auto'>
            <button onClick={()=> decreaseCartQuantity(e.id)} className='bg-gray-200 h-[92%] my-auto px-4 rounded text-center'>-</button>
            <p className='h-fit px-4 my-auto'>{e.quantity}</p>
            <button onClick={()=> increaseCartQuantity(e.id, e.name)} className='bg-gray-200 h-[92%] my-auto px-4 rounded text-center'>+</button>
          </div>
          <div onClick={()=> removeFromCart(e.id)} className='my-auto text-lg text-gray-300 ml-auto cursor-pointer'>
            <ImCross />
          </div>
        </div>
        })
      }
     
      <button className='mt-auto py-2 w-full bg-[#EB9B2F] rounded text-white font-semibold'>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default Cart