import initStripe from 'stripe'
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
        <p>Step 1 is an initial strategy meeting to kickoff the development of your service.</p>
        <p>You can schedule that meeting at <a href="https://calendly.com/getorderup/strategy-meeting-1">https://calendly.com/getorderup/strategy-meeting-1</a>, we advise that you schedule this meeting as
        soon as possible so we can begin the development of your service.</p>
        <p>After the strategy meeting, our team will begin developing your service at full speed. You will receive design and development updates from us as progress is made, and our
        team will be available to answer any questions that may arise once we get started, you can email us at any time at support@getorderup.com</p>
        <p>We understand that building a new website and mobile ordering software can be a complex process, but we are here to make it as easy and seamless as possible. You can be confident that your project will be in safe hands.</p>
        <p>Thank you again for choosing OrderUp as your software solutions provider. We are looking forward to a successful partnership with you and we are eager to get started!</p>
        <p>Best Regards,</p>
        <p>Wyatt Walker</p>
        <p>CEO & Founder</p>
        <p>Order Up</p>
        `,
        attachments:[{
          filename:'welcome-banner.png',
          path:'./public/welcome-banner.png',
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