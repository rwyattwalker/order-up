import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({clientSecret}) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentRequest, setPaymentRequest] = React.useState(null);



  React.useEffect(()=>{
    if(!stripe || !elements){
      return;
    }
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Hello',
          amount: 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
      pr.on('paymentmethod', async (e) => {
        //create payment intent on server
        // const {clientSecret} = await fetch("/api/create-payment-intent", {
        //   method: 'POST',
        //   headers:{
        //     'Content-Type':'application/json',
        //   },
        //   body:JSON.stringify({
        //     paymentMethodType: 'card',
        //     currency: 'usd',
        //   }),
        // }).then(r => r.json());
        //confirm the payment intent on client
        const {error, paymentIntent} = await stripe.confirmCardPayment(
          clientSecret, {
            payment_method: e.paymentMethod.id,
          },{
            handleActions: false,
          }
        )
        if(error){
          e.complete('fail');
          return;
        }
        e.complete('success');
        if(paymentIntent.status == 'requires_action'){
          stripe.confirmCardPayment(clientSecret);
        }
      });
  }, [stripe, elements, clientSecret]);

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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
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
      {/* {paymentRequest &&
        <PaymentRequestButtonElement options={{paymentRequest}} />
      } */}
    <form id="payment-form" onSubmit={handleSubmit} className="mt-3">
     
      {/* <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="mt-2">     
      <label> 
        <input id="tos" type="checkbox" className="m-1 text-center" name="terms-and-conditions" />
        I Agree to the <span className="text-blue-500">Terms and Conditions</span>
      </label>
   
      </div>
      <button disabled={isLoading || !stripe || !elements} id="submit" className="w-full py-2 bg-[#97BBAF] rounded text-white font-semibold">
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