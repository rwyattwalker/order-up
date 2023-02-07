const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



export default async function handler(req, res){
  if(req.method==='POST'){
    console.log(req.body, "REQ BODY")
    const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: req.body.card.number,
      exp_month: req.body.card.exp_month,
      exp_year: req.body.card.exp_year,
      cvc: req.body.card.cvc,
    },
  });
  res.status(200).send({paymentMethod})
  }
}