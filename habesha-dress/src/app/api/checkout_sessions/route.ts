// import { Stripe, loadStripe } from "@stripe/stripe-js";
// import getStripe from "../../../../utils/get-stripejs";
// import { NextResponse } from "next/server";
// const stripePromise = async () => {
//   const stripe: any = await loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );
//   return stripe;
// };

// export async function GET(req: any, res: any) {
//   // Partial of ./pages/api/checkout_sessions/index.ts
//   // ...
//   // Create Checkout Sessions from body params.
//   // getStripe();
//   const stripe: any = getStripe();
//   try {
//     const params: any = {
//       submit_type: "donate",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           name: "Custom amount donation",
//           amount: 50,
//           currency: "EUR",
//           quantity: 1,
//         },
//       ],
//       success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//     };
//     console.log({ stripe: stripe });
//     const checkoutSession: any = await stripe.checkout.sessions.create(params);
//     return NextResponse.json(
//       {
//         success: true,
//         sessionStripe: checkoutSession,

//         message: "checkout intiated",
//       },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       {
//         success: false,
//         err: err,
//         message: "checkout intiated",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey: any = process.env.STRIPE_SECRET_KEY;
const stripe: any = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

export async function POST(req: any, res: any) {
  // if (req.method !== "POST") {
  //   res.setHeader("Allow", "POST");
  //   res.status(405).end("Method Not Allowed");
  //   return;
  // }

  try {
    // const { items, successUrl, cancelUrl } = req.body;
    const items: any = [
      {
        id: 1,
        name: "item one",
        price: 23,
        quantity: 1,
      },
      {
        id: 2,
        name: "item one",
        price: 23,
        quantity: 1,
      },
      {
        id: 3,
        name: "item one",
        price: 23,
        quantity: 1,
      },
    ];
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://your-website.com/success",
      cancel_url: "https://your-website.com/failed",
    });
 
    return NextResponse.json(
      {
        success: true,
        url: session.url,

        message: "checkout intiated",
      },
      { status: 200 }
    );
    // res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,

        message: "checkout intiated",
      },
      { status: 404 }
    );
  }
}
