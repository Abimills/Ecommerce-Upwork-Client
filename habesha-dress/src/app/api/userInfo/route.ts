import connectMongoDB from "@/app/api/libs/mongodb";

import { NextResponse } from "next/server";
import ClothUserInfo from "../models/userInfo";

export async function GET(req: any) {
  await connectMongoDB();
  const users = await ClothUserInfo.find();
  return NextResponse.json(
    { message: "here is a list of all users" },
    { status: 200 }
  );
}

export async function POST(req: any) {
  await connectMongoDB();
  const { userInfo } = await req.json();
  console.log(userInfo);
  try {
    const newUser = await ClothUserInfo.create({
      userInfo,
    });
    return NextResponse.json(
      { success: true, message: "created a new userInfo", newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log({
      success: false,
      message: "error while trying to create user info",
      error,
    });
  }
}
