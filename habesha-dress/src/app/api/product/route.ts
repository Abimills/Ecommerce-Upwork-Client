import connectMongoDB from "@/app/api/libs/mongodb";
import ClothProduct from "../models/product";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  await connectMongoDB();
  const cloth = await ClothProduct.find();
  return NextResponse.json(
    { message: "fetched all clothes", cloth },
    { status: 200 }
  );
}
export async function POST(req: any) {
  const {
    title,
    description,
    img,
    price,
    rating,
    category,
    purchasedNumber,
    availableSizes,
    availableColors,
    forWhichGender,
    boughtWithIds,
  } = await req.json();
  await connectMongoDB();
  const newCloth = await ClothProduct.create({
    title,
    description,
    img,
    price,
    rating,
    category,
    purchasedNumber,
    availableSizes,
    availableColors,
    forWhichGender,
    boughtWithIds,
  });
  return NextResponse.json(
    { message: "created a new cloth", newCloth },
    { status: 201 }
  );
}

export async function DELETE(req: any) {
  const id: string = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ClothProduct.findByIdAndDelete(id);
  return NextResponse.json({ message: "cloth deleted" }, { status: 200 });
}
