import connectMongoDB from "@/app/api/libs/mongodb";
import ClothProduct from "../models/product";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  await connectMongoDB();
  const query: string = req.nextUrl.searchParams.get("query");
  if (query) {
    const cloths = await ClothProduct.find({
      $or: [
        { forWhichGender: { $regex: new RegExp(`\\b${query}\\b`, "i") } },
        { whichGroupCloth: { $regex: new RegExp(`\\b${query}\\b`, "i") } },
        { title: { $regex: new RegExp(`\\b${query}\\b`, "i") } },
        { category: { $regex: new RegExp(`\\b${query}\\b`, "i") } },
        { description: { $regex: new RegExp(`\\b${query}\\b`, "i") } },
        { clothOccasion: { $regex: new RegExp(`\\b${query}\\b`, "i") } },
        // { couples: { $regex: new RegExp(query, "i") } },
      ],
    });
    return NextResponse.json(
      {
        success: true,
        count: cloths?.length,
        message: "fetched searched cloth",
        cloths,
      },
      { status: 200 }
    );
  }
}
