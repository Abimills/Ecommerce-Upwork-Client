import connectMongoDB from "@/app/api/libs/mongodb";
import ClothProduct from "../models/product";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  const id: string = req.nextUrl.searchParams.get("id");

  await connectMongoDB();

  //   const totalCloths = await ClothProduct.countDocuments();
  if (id) {
    const cloth = await ClothProduct.findById(id);
    if (!cloth) {
      return NextResponse.json({ message: "Cloth not found", status: 404 });
    }

    // Fetch 10 random similar clothes based on gender, occasion, and discount > 0
    const similarClothes = await ClothProduct.aggregate([
      {
        $match: {
          forWhichGender: cloth.forWhichGender,
          // occasion: cloth.occasion,
          _id: { $ne: id }, // Exclude the current cloth ID
          discount: { $gt: 0 }, // Filter documents with discount greater than 0
        },
      },
      { $sample: { size: 10 } }, // Get 10 random documents
    ]);

    return NextResponse.json(
      {
        message: "fetched single cloth & similar Clothes",
        cloth,
        similarClothes,
      },
      { status: 200 }
    );
  }

  const data = await ClothProduct.aggregate([
    {
      $match: {
        discount: { $gt: 0 }, // Filter documents with discount greater than 0
        $or: [
          { forWhichGender: "Women" },
          { forWhichGender: "Men" },
          { forWhichGender: "Kids" },
          { couples: "true" },
        ],
      },
    },
    { $group: { _id: "$forWhichGender", products: { $push: "$$ROOT" } } },
    {
      $project: {
        _id: 0,
        products: { $slice: ["$products", 0, 1] },
      },
    },
    { $unwind: { path: "$products", preserveNullAndEmptyArrays: true } },
  ]);

  return NextResponse.json(
    {
      success: true,
      count: data?.length,

      message: "fetched all clothes",
      data,
    },
    { status: 200 }
  );
}
