import bcrypt from "bcrypt";
import connectMongoDB from "@/app/api/libs/mongodb";
import ClothUser from "../models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();
    const user = await ClothUser.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Either  the email or password is incorrect.",
      });
    } else if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return NextResponse.json({
          success: true,
          message: "user logged in",
          user: user,
        });
      } else if (!auth) {
        return NextResponse.json({
          success: false,
          message: "The password is incorrect",
        });
      }
    }
  } catch (error) {
    console.log({ message: "error while trying to login user", error });
  }
}
