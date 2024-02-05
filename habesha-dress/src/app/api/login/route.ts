import { bcrypt } from "bcrypt";
import connectMongoDB from "@/app/api/libs/mongodb";
import User from "../models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { email, password } = await req.json();
  await connectMongoDB();
  const user = await User.findOne(email);
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Either  the email or password is incorrect.",
    });
  } else {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return NextResponse.json({
        success: true,
        user: user,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "The password is incorrect",
      });
    }
  }
}
