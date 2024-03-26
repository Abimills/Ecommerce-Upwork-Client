import connectMongoDB from "@/app/api/libs/mongodb";
import ClothsOrder from "../models/order";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  await connectMongoDB();

  const id: string = req.nextUrl.searchParams.get("id");
  if (id) {
    const order = await ClothsOrder.findById(id);
    if (!order) {
      return NextResponse.json({ message: "order not found", status: 404 });
    }

    return NextResponse.json(
      {
        message: "fetched single order",
        order,
      },
      { status: 200 }
    );
  }

  const totalOrders = await ClothsOrder.countDocuments();

  const orders = await ClothsOrder.find();
  return NextResponse.json(
    {
      success: true,
      count: orders?.length,

      totalOrders,
      message: "fetched all orders",
      orders,
    },
    { status: 200 }
  );
}

export async function POST(req: any) {
  const payload = await req.json();
  await connectMongoDB();
  const newOrder = await ClothsOrder.create(payload);
  return NextResponse.json(
    { success: true, message: "created a new order", newOrder },
    { status: 201 }
  );
}
export async function DELETE(req: any) {
  const id: string = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ClothsOrder.findByIdAndDelete(id);
  return NextResponse.json({ message: "order deleted" }, { status: 200 });
}
