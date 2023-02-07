import initStripe from 'stripe'
import {buffer} from 'micro'
const nodemailer = require("nodemailer");
export const config = { api: {bodyParser: false}};

const endpointSecret = "whsec_ByDI6PaEz4S4UwMhUAUzXRjPBvA5030E";

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secure:true,
    port:465,
    auth: {
        user:'wwalker@evolveweb.io',
        pass:'Sey3qT6Jug4W',
    },
});

const handler = async (req, res) => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
  const signature = req.headers['stripe-signature']
  const reqBuffer = await buffer(req)
  let event;

  try{
     event = stripe.webhooks.constructEvent(reqBuffer, signature, endpointSecret)
  }
  catch(error){
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`)
  }
   // Handle the event
   switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      const customer = await stripe.customers.retrieve(paymentIntent.customer);
      console.log(customer, "THE CUSTOMER")
      transporter.sendMail({
        from: 'support@getorderup.com',
        to: customer.email,
        subject: 'Success!',
        html:"<h1>Congratulations<h1><p>You are one step closer to owning the most efficient and user friendly food truck in town!</p>"
       }, (err, info) => {
        if(err){
          console.log(err);
        }else{
          console.log('Sent', info.response)
          res.status(200).json({success:true})
        }
      })
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
    console.log(`Unhandled event type ${event.type}.`);
  }
  console.log({event})
  res.send({received: true});
}
export default handler;