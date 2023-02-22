import initStripe from 'stripe'
import path from 'path'
import {buffer} from 'micro'
const nodemailer = require("nodemailer");
export const config = { api: {bodyParser: false}};

const endpointSecret = process.env.ENDPOINT_SECRET;

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
      const mailRes = await transporter.sendMail({
        from: 'support@getorderup.com',
        to: customer.email,
        subject: 'Welcome to OrderUp!',
        html: `<img src="cid:welcomebanner.ee"/>
        <h4>We are thrilled to welcome you to OrderUp – your go-to partner for innovative food truck software solutions!</h4>
        <p>We are honored to have you as a valued customer and we are eager to get started on creating a world-class website and mobile ordering software that will help you take your food truck business to new heights.</p>
        <p>Get started by scheduling your development strategy meeting at <a href="https://calendly.com/getorderup/strategy-meeting-1">https://calendly.com/getorderup/strategy-meeting-1</a>, during this meeting we will be asking a few questions about your business and will also answer any questions you may have.</p>
        <p>Thank you again for choosing OrderUp as your software solutions provider. We are looking forward to a successful partnership with you and we are eager to get started!</p>
        <p>Best Regards,</p>
        <p>Wyatt Walker</p>
        <p>CEO & Founder</p>
        <p>Order Up</p>
        `,
        attachments:[{
          filename:'welcome-banner.png',
          path: path.resolve('./public/welcome-banner.png'),
          cid:'welcomebanner.ee'
        }]
       })
       if(mailRes.err){
        console.log(err);
       }else{
          console.log('Sent', mailRes.response)
        }
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