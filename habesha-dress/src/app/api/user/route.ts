import connectMongoDB from "@/app/api/libs/mongodb";
import User from "../models/user";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json(
    { message: "here is a list of all users", users },
    { status: 200 }
  );
}

export async function POST(req: any) {
  const {
    name,
    email,
    password,
    photoUser,
    ItemsBought,
    location,
    favReviews,
  } = await req.json();
  await connectMongoDB();
  const newUser = await User.create({
    name,
    email,
    password,
    photoUser,
    ItemsBought,
    location,
    favReviews,
  });
  return NextResponse.json(
    { message: "created a new user", newUser },
    { status: 201 }
  );
}
