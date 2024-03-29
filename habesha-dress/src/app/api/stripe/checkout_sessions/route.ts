import calculateShipping from "@/app/util/calculateShiping";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey: any = process.env.STRIPE_SECRET_KEY;
const stripe: any = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

export async function POST(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    const { products, successUrl, cancelUrl } = await req.json();
    const shippingCost = calculateShipping(products?.length);
    const shippingOption = {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
          amount: shippingCost * 100,
          currency: "eur",
        },
        display_name: "DHL Express Shipping",
      },
    };
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [],
      shipping_options: [shippingOption],

      line_items: products.map((item: any) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.title,
              images: [item.img],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json(
      {
        success: true,
        url: session.url,
        id: session.id,

        message: "checkout initiated",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,

        message: "checkout issues",
      },
      { status: 500 }
    );
  }
}
