
const stripe = require('stripe')('sk_test_51MSWxUFWbP8S10HmW4UE1p1kLW0ENFES63lJzm5tHQrBMloejWuL2N21GqMXaundLLOqQ68GmF3WQwxVlwkVEvjK005df3CpUQ');
const endpointSecret = "whsec_sKYMPLn03bCseIFJKea2D2FWTVXjLEIB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let event = request.body;
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.sendStatus(400);
      }
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

    // Return a 200 response to acknowledge receipt of the event
    res.sendStatus(200);
  };
}

export default handler;