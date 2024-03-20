import connectMongoDB from "@/app/api/libs/mongodb";
import ClothUser from "../models/user";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongoDB();
  const users = await ClothUser.find();
  return NextResponse.json(
    { message: "here is a list of all users", users },
    { status: 200 }
  );
}

export async function POST(req: any) {
  try {
    const {
      name,
      email,
      password,
      photoUser,
      gender,
      phone,
      dateOfBirth,
      location,
      favReviews,
      itemsBought,
    } = await req.json();
    await connectMongoDB();
    const user = await ClothUser.findOne({ email });
    if (user) {
      return NextResponse.json({
        success: false,
        registerIssue: "email exist",
        message: "Either  the email or password is incorrect.",
      });
    }
    if (!user) {
      const newUser = await ClothUser.create({
        name,
        email,
        password,
        gender,
        photoUser,
        phone,
        dateOfBirth,
        location,
        favReviews,
        itemsBought,
        role: "user",
      });
      return NextResponse.json(
        { success: true, message: "created a new user", newUser },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log({
      success: false,
      message: "error while trying to register user",
      error,
    });
  }
}
export async function PUT(req: any) {
  try {
    const { userId, itemId } = await req.json();
    await connectMongoDB();
    const user = await ClothUser.findById(userId);
    if (user) {
      const checkId = user.favReviews.find((id: any) => id === itemId);
      if (!checkId) {
        const updated = await ClothUser.updateOne(
          { _id: userId },
          { $push: { favReviews: itemId } }
        );

        return NextResponse.json(
          { success: true, message: "updated favorites of  user", updated },
          { status: 201 }
        );
      } else {
        const updated = await ClothUser.updateOne(
          { _id: userId },
          { $pull: { favReviews: itemId } }
        );

        return NextResponse.json(
          { success: true, message: "updated favorites of  user", updated },
          { status: 201 }
        );
      }
    }
  } catch (error) {
    console.log({
      success: false,
      message: "error while trying to register user",
      error,
    });
  }
}
