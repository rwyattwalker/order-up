const stripe = require('stripe');
const axios = require('axios');

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_0958e48b78ed8166899a549b993a4279e1812776dcb59e55661293c0f838c17b";


export default async function handler(req, res) {
  const sig = req.headers['stripe-signature']
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
   // Handle the event
   console.log(`Unhandled event type ${event.type}`);

   // Return a 200 response to acknowledge receipt of the event
   res.send();
};