const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){
if(req.method === 'POST'){
  console.log(req.body)
  const customer = await stripe.customers.update(
    req.body.customerId,
    {email: req.body.email, name: req.body.name}
    );
    return res.status(200).send(customer)
}
  res.status(500)
}