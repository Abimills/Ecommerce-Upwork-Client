import { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "@/app/api/libs/mongodb";
import ClothProduct from "../models/product";
import { NextResponse } from "next/server";

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await connectMongoDB();

  try {
    const updateResult: any = await ClothProduct.updateMany({}, [
      // {
      //   $set: { discountedPrice: { $subtract: ["$price", "$discount"] } }, // Create a new field with the updated name
      // },
      {
        $unset: "discountPrice", // Remove the old field
      },
    ]);
    return NextResponse.json(
      {
        message: "Discounted price added to all products",
        count: updateResult.modifiedCount,
        data: updateResult,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Discounted price added to all products",
        error,
      },
      { status: 500 }
    );
  }
}
