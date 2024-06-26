import bcrypt from "bcrypt";
import connectMongoDB from "@/app/api/libs/mongodb";
import ClothUser from "../models/user";
import ClothProduct from "../models/product";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(req: any) {
  try {
    const { token, email, password } = await req.json();
    await connectMongoDB();
    const decodedToken: any = jwt.verify(token, "nice-secret-key");
    if (!decodedToken?.userId) {
      return NextResponse.json({
        success: false,
        message: "Please sign in again problem with token",
      });
    }

    if (decodedToken?.userId) {
      const user = await ClothUser.findById(decodedToken?.userId);
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "can not find user",
        });
      }
      if (user) {
        const userGender = user?.gender === "man" ? "Men" : "Women";
        const recommendedItems = await ClothProduct.aggregate([
          { $match: { forWhichGender: userGender } },
          { $sample: { size: 10 } },
          { $project: { _id: 1 } },
        ]);
        const auth: any = await bcrypt.compare(password, user.password);
        if (auth) {
          const updatedUser = await ClothUser.findByIdAndUpdate(
            decodedToken?.userId,
            {
              $set: {
                email,
              },
            },
            { new: true }
          );

          const userInfo = {
            email: updatedUser.email,

            token: token,
          };
          return NextResponse.json({
            success: true,
            message: "successfully updated email",
            email,
            token,
          });
        } else if (!auth) {
          return NextResponse.json({
            success: false,
            message: "Unauthenticated user, login and  try again",
          });
        }
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
