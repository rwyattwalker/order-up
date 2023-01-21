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
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex w-[100vw] h-[100vh] bg-[#e1e1e1]">
      <div className="my-auto mx-auto w-[500px] bg-white p-10 rounded">
         {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm  clientSecret={clientSecret} />
          </Elements>
         )}
      </div>
     
    </div>
  );
  
}
