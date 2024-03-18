import bcrypt from "bcrypt";
import connectMongoDB from "@/app/api/libs/mongodb";
import ClothUser from "../models/user";
import ClothProduct from "../models/product";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();
    const user = await ClothUser.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        loginIssue: "email",
        message: "Either  the email or password is incorrect.",
      });
    } else if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "nice-secret-key", {
          expiresIn: "1h",
        });
        const userGender = user.gender === "man" ? "Men" : "Women";
        const recommendedItems = await ClothProduct.aggregate([
          { $match: { forWhichGender: userGender } },
          { $sample: { size: 10 } },
        ]);
        const sendIds = recommendedItems.map((item: any) => item._id);

        const userInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          orders: user.orders,
          message: user.message,
          newsletter: user.message,
          wishlist: user.favReviews,
          recommendedProducts: sendIds,
          token: token,
        };
        return NextResponse.json({
          success: true,
          message: "user logged in",
          user: userInfo,
        });
      } else if (!auth) {
        return NextResponse.json({
          success: false,
          loginIssue: "password",
          message: "The password is incorrect",
        });
      }
    }
  } catch (error) {
    console.log({ message: "error while trying to login user", error });
  }
}
export async function PUT(req: any) {
  try {
    const { token, data, id } = await req.json();
    await connectMongoDB();
    const decodedToken = jwt.verify(token, "nice-secret-key");
    if (decodedToken) {
      const updatedUser = await ClothUser.findByIdAndUpdate(
        id,
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
