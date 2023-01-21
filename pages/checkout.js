import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm.jsx";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MSWxUFWbP8S10HmRdxmh5X16w7A9Cq53NwDLyKfqaGen6IzVYHJrnpusdbea6mL7Y61SO5zAfv2X5mkY8R36jNe00VOmN13T4");

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json"
    },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex min-w-[100vw] min-h-[100vh] bg-[#e1e1e1]">
      <div className="absolute sm:top-0 sm:right-0 min-h-full w-full flex flex-col justify-center sm:w-[500px] bg-white p-10 sm:rounded">
            <div className="absolute top-2 right-2">X</div>
           <div className="flex flex-col mx-auto border border-gray-200 rounded w-full p-4">
            <div className="font-bold text-2xl">Order Summary</div>
            <div className="font-semibold ml-2 text-gray-500 border-b border-gray-500">Services</div>
            <div className="flex flex-col">
              <div className="ml-4  font-semibold text-black">Basic Website</div>
              <div className="flex w-full justify-between">
                <div className="ml-4 text-gray-400">Set Up Fee </div><div className="font-semibold text-black">$999</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="ml-4 text-gray-400">Monthly Subscription Cost</div><div className="font-semibold text-black">$159</div>
              </div>
            </div>
            <div className="flex w-full justify-between mt-3">
                <div className=" text-black font-bold">Total Due Today</div><div className="font-semibold text-black text-lg">$999</div>
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
  );
  
}
