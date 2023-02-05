import React, {useState} from "react";
import Link from "next/link";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({clientSecret, customer}) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  }


  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    await fetch('/api/update-customer', {
      method: 'POST',
      headers: { "Content-Type": "application/json"
    },
      body: JSON.stringify({customerId: customer, email: email, name: name})
    }) 
    //submit payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://getorderup.com",
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };


  const paymentElementOptions = {
    layout: "tabs",
  };


  return (
    <> 
    <form id="payment-form" onSubmit={handleSubmit} className="mt-3">
        <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name on Card"
          />
       <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="mt-2">     
      <label> 
        <input id="tos" type="checkbox" className="m-1 text-center" name="terms-and-conditions" onChange={handleCheck}/>
        I have read and agree to the <Link target={"_blank"} href={'/terms'}><span className="text-blue-500">Terms of Service</span></Link>
      </label>
   
      </div>
      <button disabled={isLoading || !stripe || !elements || !checked} id="submit" className="w-full py-2 bg-blue-500 rounded text-white font-semibold">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Buy Now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    </>
  );
}