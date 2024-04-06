import calculateShipping from "@/app/util/calculateShiping";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripeSecretKey: any = process.env.STRIPE_SECRET_KEY;
const stripe: any = new Stripe(stripeSecretKey);

export async function POST(req: any, res: NextApiResponse) {
  const sig = req.headers.get("stripe-signature") as string;

  const payload: any = await req.text();

  const endpointSecret: string =
    "whsec_40ef6f83fda370821e4bf317b8ea1ca814f4f3ecadd9c62030484c4a90626db6";

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        erroring: err,
        message: "Webhook Error",
      },
      { status: 400 }
    );
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Completed order:", session);
    const orderNumber = session?.id;
    const subtotalOrderAmount = session?.amount_subtotal;
    const totalOrderAmount = session?.amount_total;
    // const customerId = session?.client_reference_id;
    const shippingAmount = session?.shipping_cost?.amount_total;
    const currency = session?.currency;
    const dateOfOrder = session?.created;
    const customerAddress = session?.customer_details.address;
    const customerEmail = session?.customer_details?.email;
    const customerPhone = session?.customer_details?.phone;
    const customerName = session?.customer_details?.name;
    const paymentStatus = session?.payment_status;
    const wholeOrderObject = [session];

    const res = await axios.post(
      "https://ecommerce-upwork-client-j6gp.vercel.app/api/order",
      {
        orderNumber,
        subtotalOrderAmount,
        totalOrderAmount,
        shippingAmount,
        currency,
        dateOfOrder,
        customerAddress,
        customerEmail,
        customerPhone,
        customerName,
        paymentStatus,
        wholeOrderObject,
      }
    );
    if (res.data.success) {
      return NextResponse.json(
        {
          success: true,

          message: "saved order",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,

          message: "problem with saving data to db",
        },
        { status: 500 }
      );
    }
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
