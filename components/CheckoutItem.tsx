import React, {useState} from 'react'
import {AiOutlineDown} from 'react-icons/ai'

type Props = {
  item:{
    name: string
    id:number
    quantity: number
    price: number
    fee: number
  }
}

function CheckoutItem({item}:Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
   
      <div className="flex flex-col">              
        <div className="flex gap-1 -ml-3 cursor-pointer" onClick={()=>setOpen(!open)}>
          <AiOutlineDown  className="mt-1"/><div className="font-semibold text-black">{item.name}</div>
        </div> 
        {open &&
        <div className='flex flex-col ml-4 text-gray-400'>  
          <div className=''>Qty. {item.quantity}</div>
          <div className="flex w-full justify-between">
            <div className="">Development fee </div><div className="font-semibold text-black">${item.fee}</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="">Due monthly after development</div><div className="font-semibold text-black">${item.price}</div>
          </div> 
        </div>
        }
      </div>
   
</>
  )
}

export default CheckoutItem