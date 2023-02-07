const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res){
    if(req.method === 'POST'){
        console.log(req.body, 'CONFIRM REQ BODY')
        const paymentIntent = await stripe.paymentIntents.confirm(
        req.body.paymentIntent.paymentIntent.id, 
      {payment_method:req.body.paymentMethod.paymentMethod.id,
        setup_future_usage: "off_session"
      });
      return res.status(200).send(paymentIntent)
    }

}