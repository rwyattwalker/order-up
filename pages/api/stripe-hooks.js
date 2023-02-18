import initStripe from 'stripe'
import {buffer} from 'micro'
const nodemailer = require("nodemailer");
export const config = { api: {bodyParser: false}};

const endpointSecret = "whsec_sKYMPLn03bCseIFJKea2D2FWTVXjLEIB";

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secure:true,
    port:587,
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
        subject: 'Welcome to OrderUp!',
        html: `<p>We are thrilled to welcome you to OrderUp – your go-to partner for innovative food truck software solutions! We are honored to have you as a valued customer and we are eager to get started on creating a world-class website and mobile ordering software that will help you take your food truck business to new heights.</p>
        <p>We would like to take this opportunity to formally introduce you to your dedicated project manager, Facundo Martin. Facundo will be your primary point of contact throughout the development process and will be working closely with you to ensure that every aspect of your project is executed to perfection.</p>
        <p>Facundo is an experienced professional with a passion for delivering top-quality software solutions to food truck owners like you. He will be your advocate, ensuring that your needs and expectations are met every step of the way. He will be communicating with you regularly to keep you informed of the progress of your project, answer any questions you may have, and provide you with updates on key milestones and deadlines.</p>
        <p>Going forward, you can expect the following from Facundo:</p>
        <ul>
          <li>Regular status updates and progress reports</li>
          <li>Prompt response to any questions or concerns you may have</li>
          <li>Prompt resolution of any issues or challenges that may arise during the development process</li>
          <li>Proactive communication to ensure your project stays on track</li>
        </ul>
        <p>Facundo will be reaching out to you within the next 24 hours via email to set up a needs discovery meeting and get the development of your project underway.</p>
        <p>We understand that building a new website and mobile ordering software can be a complex process, but we are here to make it as easy and seamless as possible. With Facundo at the helm, you can be confident that your project will be in safe hands.</p>
        <p>Thank you again for choosing OrderUp as your software solutions provider. We are looking forward to a successful partnership with you and we are eager to get started!</p>
        <p>Best Regards,</p>
        <p>Wyatt Walker</p>
        <p>CEO & Founder</p>
        <p>Order Up</p>
        `
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