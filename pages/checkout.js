/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useShoppingCart} from '../context/ShoppingCartContext.tsx'
import CheckoutItem from '../components/CheckoutItem'
import CheckoutForm from "../components/CheckoutForm.jsx";
import Image from "next/image";
import ClientOnly from '../components/ClientOnly.tsx'
import { CircularProgress } from "@mui/material";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MSWxUFWbP8S10HmRdxmh5X16w7A9Cq53NwDLyKfqaGen6IzVYHJrnpusdbea6mL7Y61SO5zAfv2X5mkY8R36jNe00VOmN13T4");

export default function Checkout() {
  const {cartItems} = useShoppingCart();
  const [paymentInt, setPaymentInt] = React.useState(null);
  React.useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json"
      },
        body: JSON.stringify({ items: cartItems }),
      })
        .then((res) => res.json())
        .then((data) => setPaymentInt(data))
  }, []);
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
  const calculateMonthly = (items) => {
    let total = 0;
    items.map((e)=>{
      total += (e.price * e.quantity)
    })
    return total
  }
  const appearance = {
    theme: 'flat',
  };
  const clientSecret = paymentInt?.clientSecret
  const options = {
    clientSecret,
    appearance,
  };

  return (<ClientOnly>
    <div className="flex min-w-[100vw] min-h-[100vh] sm:min-h-[93vh] bg-[#e1e1e1] justify-center sm:mt-[70px]">
      <div className="flex flex-col mt-[80px] md:my-auto mx-auto md:w-[750px] lg:w-[1000px] xl:w-[1200px] gap-2">
      <div className="flex justify-center lg:justify-between w-full h-fit gap-10">
        <div className="hidden lg:inline w-2/3 xl:w-1/2 rounded  relative p-[10%] min-h-[500px]">
          <Image src={'/beautiful-site.png'} fill style={{objectFit:"contain", borderRadius:"15px"}} alt="Beautiful site design" className="rounded" />
        </div>
          <div className="h-fit my-auto flex flex-col justify-center sm:w-[500px] bg-white p-10 rounded">
           {/* <div className="flex flex-col mx-auto border border-gray-200 rounded w-full px-4 h-50 overflow-x-hidden overflow-y-scroll scrollbar-hide">
            <div className="flex flex-col h-fit mt-2">
              <div className="font-bold text-2xl">Order Summary</div>
              <div className="font-semibold ml-2 text-gray-500 border-b border-gray-500">Services</div>
                {cartItems.map((e, i)=>{
                  return(
                    <CheckoutItem item={e} key={i} />
                )})}
              <div className="flex flex-col w-full justify-between mt-3">
                <div className="flex w-full justify-between text-base">
                  <div className=" text-gray-500 font-bold flex flex-col sm:flex-row">Due monthly&nbsp;<div>after development</div></div><div className="font-semibold text-gray-500 text-base">${calculateMonthly(cartItems)}</div>
                </div>
                <div className="flex w-full justify-between">
                   <div className="text-black font-bold">Total Due Today</div><div className="font-semibold text-black text-lg">${calculateOrderAmount(cartItems)}</div>
                </div>
                 
              </div>

            </div>
          </div> */}
          {/* <div className="separator flex flex-col w-full h-[1px] my-5"></div> */}
        {!clientSecret &&
          <div className="mx-auto min-h-[500px] justify-center flex">
            <div className="my-auto h-fit">
              <CircularProgress />
            </div>
          </div>
        }
        
         {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm  clientSecret={paymentInt.clientSecret} customer={paymentInt.customer} />
          </Elements>
         )}
        </div> 
        </div>
      </div>
    </div></ClientOnly>
  );
  
}
