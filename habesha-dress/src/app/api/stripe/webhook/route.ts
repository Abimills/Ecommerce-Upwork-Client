import calculateShipping from "@/app/util/calculateShiping";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey: any = process.env.STRIPE_SECRET_KEY;
const stripe: any = new Stripe(stripeSecretKey);

export async function POST(req: any, res: NextApiResponse) {
  const sig: any = req?.headers?.get("stripe-signature");

  const payload = JSON.stringify(await req.json());
  //     "whsec_40ef6f83fda370821e4bf317b8ea1ca814f4f3ecadd9c62030484c4a90626db6";
  console.log({ sign: sig });
  console.log({ payload: payload });

  const endpointSecret =
    "whsec_40ef6f83fda370821e4bf317b8ea1ca814f4f3ecadd9c62030484c4a90626db6";

  let event: any;
  //   try {
  event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  console.log({ errorEvent: event });
  //   } catch (err) {
  //     // return res.status(400).send(`Webhook Error: ${err.message}`);
  //     return NextResponse.json(
  //       {
  //         success: false,
  //         erroring: err,
  //         message: "Webhook Error",
  //       },
  //       { status: 400 }
  //     );
  //   }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Handle the completed order here
    console.log("Completed order:", session.id);

    return NextResponse.json(
      {
        success: true,
        received: true,

        message: "fetched order",
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        success: false,

        message: "order not brought",
      },
      { status: 500 }
    );
  }

  // res.status(200).json({ url: session.url });

  //     return NextResponse.json(
  //       {
  //         success: false,

  //         message: "checkout initiated",
  //       },
  //       { status: 500 }
  //     );
}
