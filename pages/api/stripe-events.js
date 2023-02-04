import { buffer } from "micro";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51MSWxUFWbP8S10HmW4UE1p1kLW0ENFES63lJzm5tHQrBMloejWuL2N21GqMXaundLLOqQ68GmF3WQwxVlwkVEvjK005df3CpUQ", {
  apiVersion: "2022-11-15",
});
const webhookSecret = "whsec_DaACbTV2YOJdH282s3J2DgdkRv0WSxFy";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log(event, "Event")
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;