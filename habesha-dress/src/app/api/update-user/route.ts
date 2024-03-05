import bcrypt from "bcrypt";
import connectMongoDB from "@/app/api/libs/mongodb";
import ClothUser from "../models/user";
import ClothProduct from "../models/product";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(req: any) {
  try {
    const { token, data } = await req.json();
    await connectMongoDB();
    const decodedToken: any = jwt.verify(token, "nice-secret-key");
    if (!decodedToken?.userId) {
      return NextResponse.json({
        success: false,
        message: "Please sign in again problem with token",
      });
    }
    if (decodedToken?.userId) {
      const updatedUser: any = await ClothUser.findByIdAndUpdate(
        decodedToken?.userId,
        {
          $set: {
            ...data,
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        return NextResponse.json({
          success: false,
          message: "A problem updating user",
        });
      }
      if (updatedUser) {
        const userGender = updatedUser.gender === "man" ? "Men" : "Women";
        const recommendedItems = await ClothProduct.aggregate([
          { $match: { forWhichGender: userGender } },
          { $sample: { size: 10 } },
        ]);
        const userInfo = {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          gender: updatedUser.gender,
          dateOfBirth: updatedUser.dateOfBirth,
          orders: updatedUser.orders,
          message: updatedUser.message,
          newsletter: updatedUser.message,
          wishlist: updatedUser.favReviews,
          recommendedProducts: recommendedItems,
          token: token,
        };
        return NextResponse.json({
          success: true,
          message: "successfully updated user",
          user: userInfo,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Unauthenticated user, login and  try again",
      });
    }
  } catch (error) {
    console.log({
      success: false,
      message: "Error while updating user information:",
      error,
    });
    return NextResponse.json({
      success: false,
      message: "error with user updating info",
    });
  }
}
