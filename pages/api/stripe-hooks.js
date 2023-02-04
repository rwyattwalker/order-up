import initStripe from 'stripe'
import {buffer} from 'micro'
//const stripe = require('stripe')('sk_test_51MSWxUFWbP8S10HmW4UE1p1kLW0ENFES63lJzm5tHQrBMloejWuL2N21GqMXaundLLOqQ68GmF3WQwxVlwkVEvjK005df3CpUQ');

export const config = { api: {bodyParser: false}};

const endpointSecret = "whsec_sKYMPLn03bCseIFJKea2D2FWTVXjLEIB";

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

  console.log({event})
  res.send({received: true});
}
export default handler;