import React, {useState, useEffect} from "react";
import {useRouter} from 'next/router'
import Link from "next/link";
import {useShoppingCart} from '../context/ShoppingCartContext.tsx'
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement
} from "@stripe/react-stripe-js";
import {GiPartyPopper} from 'react-icons/gi'
import { CircularProgress } from "@mui/material";

export default function CheckoutForm({clientSecret, customer, setCompleted}) {
  const {cartItems, clearCart} = useShoppingCart();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checked, setChecked] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [expYear, setExpYear]= useState("");
  const [expMonth, setExpMonth]= useState("");
  const [cvc, setCvc] = useState("");
  const [response, setResponse] = useState(null)
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

  useEffect(()=>{
    if(!stripe||!elements){
      return;
    }
    const pr = stripe.paymentRequest({
    currency:'usd',
    country: 'US',
    requestPayerEmail:true,
    requestPayerName:true,
    total:{
      label:"Lots of Money",
      amount:(calculateOrderAmount(cartItems)*100),
    },
    disableWallets:["link"]
  })
    pr.canMakePayment().then((result)=>{
      if(result){
        setPaymentRequest(pr)
      }
    })
    pr.on('paymentmethod', async (e) => {
      console.log(e, 'payment method')
      //Update Customer
      await fetch('/api/update-customer', {
      method: 'POST',
      headers: { "Content-Type": "application/json"
      },
      body: JSON.stringify({customerId: customer, email: e.payerEmail, name: e.payerName})
      }) 
      const {error, paymentIntent} = await stripe.confirmCardPayment(
      clientSecret,{
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
    console.log(paymentIntent)
    setCompleted(true)
    clearCart()
    setResponse(paymentIntent) 
    });
    
  }, [stripe, elements])
  const handleChange = (text) => {
    console.log(text, "text")
    let textTemp = text;
    if (textTemp.length === 2) {
      if(exp.length ===1){
        textTemp += '/';
      }
    }
    if(textTemp.length === 5){
      setExpMonth(parseInt(textTemp.split("/")[0]))
      setExpYear(parseInt('20'+(textTemp.split("/")[1])))
    }
    if(textTemp.length > 5){
      return
    }
    setExp(textTemp)
  }

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
    if(!stripe){
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    const paymentMethod = await fetch('/api/create-payment-method',{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body: JSON.stringify({card:{number:cardNumber, exp_month: expMonth, exp_year:expYear, cvc:cvc}})
    })
    .then((res)=> res.json())
    console.log(paymentMethod, 'The Response')
    //check email
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      setInvalidEmail(true)
      setIsLoading(false)
      return
    }
    //Update Customer
    await fetch('/api/update-customer', {
      method: 'POST',
      headers: { "Content-Type": "application/json"
    },
      body: JSON.stringify({customerId: customer, email: email, name: name})
    }) 
    //submit payment
    const paymentIntent = await stripe.retrievePaymentIntent(clientSecret)
    const response = await fetch('/api/confirm-payment-intent',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({paymentIntent, paymentMethod})
    }).then((res)=>res.json())
    console.log(response, "RETURNED PAYMENT INTENT")
    setResponse(response)
    if(response.status === 'succeeded'){
       setCompleted(true)
       clearCart()
    }
    setIsLoading(false);
  };


  return (
    <>   
    {response && response.status == 'succeeded' &&
      <div className='flex'>
        <div className='flex flex-col max-w-xl gap-2 my-auto'>
          <h1 className='mt-5 font-bold text-3xl text-left'>Payment Success! <GiPartyPopper className="inline -mt-2"/></h1>
          <p>Your payment has been submitted successfully, a automated receipt will be sent to your email.</p>
          <div className="flex flex-col">
            <h2 className="text-gray-400 font-semibold">Transaction ID:</h2>
            <h2 className="text-gray-400 font-semibold">{response.id}</h2>
          </div>
          <div className="flex flex-col">
            <h2 className="text-gray-400 font-semibold">Transaction Amount:</h2>
            <h2 className="text-gray-400 font-semibold">${response.amount / 100}.00</h2>
          </div> 
          
          <div className='flex gap-1'>
            <Link href='/'><button className='bg-orange-500 w-fit rounded font-semibold text-white px-2 py-2'>Back to Home</button></Link>
            <button className='bg-orange-500 w-fit rounded font-semibold text-white px-2 py-2' onClick={()=>window.print()}>Save as PDF</button>
          </div>
        </div>
      </div>
    }
    {isLoading &&
      <div className="mx-auto min-h-[500px] justify-center flex">
        <div className="my-auto h-fit">
          <CircularProgress />
        </div>
      </div>
    }
    {!response && !isLoading &&
      <form id="payment-form" onSubmit={handleSubmit} className="mt-3"> 
      {paymentRequest &&
        <>
       <PaymentRequestButtonElement options={{paymentRequest}}/>
        <div className="text-xs">By clicking the pay button you certify that you have read and agree to our <Link target={"_blank"} href={'/terms'}><span className="text-blue-500">Terms of Service</span></Link></div>
        <div className="text-center font-bold">OR</div>
        </>
      }
        <label for="name" className="text-sm">Name</label>
        <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={`bg-[#F1F1F1] h-12 rounded-xl w-full mb-2 p-[16px] placeholder-black placeholder:font-light`}
          />
       <label for="email" className="text-sm">Email</label>
       <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={`bg-[#F1F1F1] h-12 rounded-xl w-full mb-3 p-[16px] placeholder-black placeholder:font-light ${invalidEmail && 'border border-red-400'}`}
      />
      <label for="card" className="text-sm">Card Number</label>
      <input
        id="card"
        type="text"
        autoComplete="off"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="1234 1234 1234 1234"
        className={`bg-[#F1F1F1] h-12 rounded-xl w-full mb-3 p-[16px] placeholder-black placeholder:font-light ${invalidEmail && 'border border-red-400'}`}
      />
      <div className="flex gap-2">
        <div className="flex flex-col w-1/2">
            <label for="cvc" className="text-sm">CVC</label>
            <input
              id="cvc"
              type="text"
              autoComplete="off"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="CVC"
              className={`bg-[#F1F1F1] h-12 rounded-xl w-full mb-3 p-[16px] placeholder-black placeholder:font-light ${invalidEmail && 'border border-red-400'}`}
            />
        </div>
        <div className="flex flex-col w-1/2">
           <label for="exp" className="text-sm">Exp</label>
            <input
              id="exp"
              type="text"
              autoComplete="off"
              value={exp}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="MM/YY"
              className={`bg-[#F1F1F1] h-12 rounded-xl w-full mb-3 p-[16px] placeholder-black placeholder:font-light ${invalidEmail && 'border border-red-400'}`}
            />
        </div>
      </div>
     
     
      <div className="mb-1">     
      <label> 
        <input id="tos" type="checkbox" className="m-1 text-center" name="terms-and-conditions" onChange={handleCheck}/>
        I have read and agree to the <Link target={"_blank"} href={'/terms'}><span className="text-blue-500">Terms of Service</span></Link>
      </label>
   
      </div>
      <button disabled={isLoading || !stripe || !elements || !checked} id="submit" className="w-full py-2 bg-blue-500 rounded text-white font-semibold">
        <span id="button-text">
          {isLoading ? "Buy Now" : "Buy Now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
    }
    
    </>
  );
}