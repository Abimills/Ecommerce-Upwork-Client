import connectMongoDB from "@/app/api/libs/mongodb";
import ClothProduct from "../models/product";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  await connectMongoDB();
  const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
  const pageSize = 16;

  // const skip = (page - 1) * pageSize;
  const id: string = req.nextUrl.searchParams.get("id");
  if (id) {
    const cloth = await ClothProduct.findById(id);
    if (!cloth) {
      return NextResponse.json({ message: "Cloth not found", status: 404 });
    }
    // Fetch 10 random similar clothes based on gender and occasion
    const similarClothes = await ClothProduct.aggregate([
      {
        $match: {
          forWhichGender: cloth.forWhichGender,
          // occasion: cloth.occasion,
          _id: { $ne: id }, // Exclude the current cloth ID
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
  if (page) {
    const skip = (page - 1) * pageSize;
    const infiniteScroll = page * pageSize;
    const totalCloths = await ClothProduct.countDocuments();
    const totalPages = Math.ceil(totalCloths / pageSize);
    const cloths = await ClothProduct.find().limit(infiniteScroll);
    return NextResponse.json(
      {
        success: true,
        count: cloths?.length,
        page,
        totalPages,
        totalCloths,
        message: "fetched all clothes",
        cloths,
      },
      { status: 200 }
    );
  }
  // await ClothProduct.updateMany({}, [
  //   {
  //     $set: {
  //       discountedValue: "$discountInPercent",
  //     },
  //   },
  //   {
  //     $unset: "discountInPercent",
  //   },
  //   // If needed, you can also renaming the field at the same time:
  //   {
  //     $rename: {
  //       discountedValue: "discountedPrice",
  //     },
  //   },
  // ]);
  const totalCloths = await ClothProduct.countDocuments();
  const totalPages = Math.ceil(totalCloths / pageSize);
  const cloths = await ClothProduct.find().skip(0).limit(pageSize);
  return NextResponse.json(
    {
      success: true,
      count: cloths?.length,
      page,
      totalPages,
      totalCloths,
      message: "fetched all clothes",
      cloths,
    },
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
    discount,
    discountedPrice,
    stock,
    likes,
    clothOccasion,
    whichGroupCloth,
    couples,
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
    discount,
    discountedPrice,
    stock,
    likes,
    clothOccasion,
    whichGroupCloth,
    couples,
  });
  return NextResponse.json(
    { success: true, message: "created a new cloth", newCloth },
    { status: 201 }
  );
}

export async function PUT(req: any) {
  const {
    id,
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
    discount,
    discountedPrice,
    stock,
    likes,
    clothOccasion,
    whichGroupCloth,
    couples,
  } = await req.json();
  await connectMongoDB();
  const updatedCloth = await ClothProduct.findByIdAndUpdate(
    id,
    {
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
      discount,
      discountedPrice,
      stock,
      likes,
      clothOccasion,
      whichGroupCloth,
      couples,
    },
    { new: true }
  );
  if (!updatedCloth) {
    return NextResponse.json(
      { message: "Cloth product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "updated cloth product", updatedCloth },
    { status: 200 }
  );
}
export async function DELETE(req: any) {
  const id: string = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await ClothProduct.findByIdAndDelete(id);
  return NextResponse.json({ message: "cloth deleted" }, { status: 200 });
}
