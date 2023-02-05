import initStripe from 'stripe'
import {buffer} from 'micro'
//const stripe = require('stripe')('sk_test_51MSWxUFWbP8S10HmW4UE1p1kLW0ENFES63lJzm5tHQrBMloejWuL2N21GqMXaundLLOqQ68GmF3WQwxVlwkVEvjK005df3CpUQ');

export const config = { api: {bodyParser: false}};

const endpointSecret = "whsec_T2AeB2iw5k69BwNRRt6FPrU0K8OrpPUd";

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