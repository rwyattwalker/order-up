// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  let total = 0;
  items.map((e)=> {
    if(e.name =='Premium Web'){
      total += (119900*e.quantity)
    }
    if(e.name == 'Basic Web'){
      total += (99900*e.quantity)
    }
    if(e.name == 'Mobile Ordering'){
      total += (49900*e.quantity)
    }
    if(e.name == 'Event Booking'){
      total += (19900*e.quantity)
    }
    if(e.name == 'Order Up Bundle!'){
      total += (149900*e.quantity)
    }
  })
  return total;
};

export default async function handler(req, res) {
  const { items } = req.body;
  console.log(items)
  const orderTotal = calculateOrderAmount(items)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderTotal,
    currency: "usd",
    automatic_payment_methods: {
      enabled: false,
    },
  });
  res.send({
  clientSecret: paymentIntent.client_secret,
  });
};