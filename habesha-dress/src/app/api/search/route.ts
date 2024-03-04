import connectMongoDB from "@/app/api/libs/mongodb";
import ClothProduct from "../models/product";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  await connectMongoDB();
  const query: string = req.nextUrl.searchParams.get("query");
  if (query) {
    const cloths = await ClothProduct.find({
      $or: [
        { forWhichGender: { $regex: new RegExp(query, "i") } },
        { whichGroupCloth: { $regex: new RegExp(query, "i") } },
        { title: { $regex: new RegExp(query, "i") } },
        { category: { $regex: new RegExp(query, "i") } },
        // { description: { $regex: new RegExp(query, "i") } },
        { clothOccasion: { $regex: new RegExp(query, "i") } },
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
  //   const cloths = await ClothProduct.find();
  //   return NextResponse.json(
  //     {
  //       success: true,
  //       count: cloths?.length,
  //       message: "fetched all clothes",
  //       cloths,
  //     },
  //     { status: 200 }
  //   );
}

// export async function POST(req: any) {
//   const {
//     title,
//     description,
//     img,
//     price,
//     rating,
//     category,
//     purchasedNumber,
//     availableSizes,
//     availableColors,
//     forWhichGender,
//     boughtWithIds,
//     discount,
//     discountInPercent,
//     stock,
//     likes,
//     clothOccasion,
//     whichGroupCloth,
//     couples,
//   } = await req.json();
//   await connectMongoDB();
//   const newCloth = await ClothProduct.create({
//     title,
//     description,
//     img,
//     price,
//     rating,
//     category,
//     purchasedNumber,
//     availableSizes,
//     availableColors,
//     forWhichGender,
//     boughtWithIds,
//     discount,
//     discountInPercent,
//     stock,
//     likes,
//     clothOccasion,
//     whichGroupCloth,
//     couples,
//   });
//   return NextResponse.json(
//     { message: "created a new cloth", newCloth },
//     { status: 201 }
//   );
// }

// export async function PUT(req: any) {
//   const {
//     id,
//     title,
//     description,
//     img,
//     price,
//     rating,
//     category,
//     purchasedNumber,
//     availableSizes,
//     availableColors,
//     forWhichGender,
//     boughtWithIds,
//     discount,
//     discountInPercent,
//     stock,
//     likes,
//     clothOccasion,
//     whichGroupCloth,
//     couples,
//   } = await req.json();
//   await connectMongoDB();
//   const updatedCloth = await ClothProduct.findByIdAndUpdate(
//     id,
//     {
//       title,
//       description,
//       img,
//       price,
//       rating,
//       category,
//       purchasedNumber,
//       availableSizes,
//       availableColors,
//       forWhichGender,
//       boughtWithIds,
//       discount,
//       discountInPercent,
//       stock,
//       likes,
//       clothOccasion,
//       whichGroupCloth,
//       couples,
//     },
//     { new: true }
//   );
//   if (!updatedCloth) {
//     return NextResponse.json(
//       { message: "Cloth product not found" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json(
//     { message: "updated cloth product", updatedCloth },
//     { status: 200 }
//   );
// }
// export async function DELETE(req: any) {
//   const id: string = req.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await ClothProduct.findByIdAndDelete(id);
//   return NextResponse.json({ message: "cloth deleted" }, { status: 200 });
// }
