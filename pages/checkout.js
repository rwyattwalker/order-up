import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useShoppingCart} from '../context/ShoppingCartContext.tsx'
import Navbar from '../components/navbar'

import CheckoutForm from "../components/CheckoutForm.jsx";
import Image from "next/image";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MSWxUFWbP8S10HmRdxmh5X16w7A9Cq53NwDLyKfqaGen6IzVYHJrnpusdbea6mL7Y61SO5zAfv2X5mkY8R36jNe00VOmN13T4");

export default function Checkout() {
  const {cartItems} = useShoppingCart();
  const [clientSecret, setClientSecret] = React.useState("");
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json"
    },
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartItems]);
  const calculateOrderAmount = (items) => {
    let total = 0;
    items.map((e)=> {
      if(e.name =='Premium Web'){
        total += (1199*e.quantity)
      }
      if(e.name == 'Basic Web'){
        total += (999*e.quantity)
      }
      if(e.name == 'Mobile Ordering'){
        total += (499*e.quantity)
      }
      if(e.name == 'Event Booking'){
        total += (199*e.quantity)
      }
      if(e.name == 'Order Up Bundle!'){
        total += (1499*e.quantity)
      }
    })
    return total;
  };

  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (<>
    <div className='md:hidden'>
          <Navbar hamburger={true} dark/>
      </div>
    <div className="flex min-w-[100vw] min-h-[100vh] bg-[#e1e1e1]">
      <div className="flex flex-col mt-[70px] md:my-20 mx-auto md:w-[800px] lg:w-[1000px] xl:w-[1200px] gap-2">
      
      <div className='hidden md:inline'>
          <Navbar hamburger={false} dark shoppingCart/>
      </div>
      <div className="flex justify-center lg:justify-between w-full h-full gap-10">
        <div className="hidden lg:inline w-2/3 xl:w-1/2 rounded  relative p-[10%]">
          <Image src={'/beautiful-site.png'} fill style={{objectFit:"contain", borderRadius:"15px"}} alt="Beautiful site design" className="rounded" />
        </div>
          <div className="h-fit my-auto flex flex-col justify-center sm:w-[500px] bg-white p-10 rounded">
           <div className="flex flex-col mx-auto border border-gray-200 rounded w-full p-4">
            <div className="font-bold text-2xl">Order Summary</div>
            <div className="font-semibold ml-2 text-gray-500 border-b border-gray-500">Services</div>
            <div className="flex flex-col">
              {cartItems.map((e)=> {
                
              })}
              <div className="ml-4  font-semibold text-black">Basic Website</div>
              <div className="flex w-full justify-between">
                <div className="ml-4 text-gray-400">Set Up Fee </div><div className="font-semibold text-black">$999</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="ml-4 text-gray-400">Monthly Subscription Cost</div><div className="font-semibold text-black">$159</div>
              </div>
            </div>
            <div className="flex w-full justify-between mt-3">
                <div className=" text-black font-bold">Total Due Today</div><div className="font-semibold text-black text-lg">${calculateOrderAmount(cartItems)}</div>
            </div>
            {/* <label className="text-xs">
              <input type="checkbox" />
              I understand that the total due today is the <span className="font-bold">SET UP FEE</span> for 
              my services only and that I must sign up for the necessary subscription(s) in order for my website or service to be deployed
            </label> */}
          </div><div className="separator flex flex-col w-full h-[1px] my-5"></div>
         {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm  clientSecret={clientSecret} />
          </Elements>
         )}
        </div> 
        </div>
      </div>
    </div></>
  );
  
}