import connectMongoDB from "@/app/api/libs/mongodb";
import ClothNewsletter from "../models/newsletter";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  await connectMongoDB();
  const email: string = req.nextUrl.searchParams.get("email");
  if (email) {
    const foundEmail = await ClothNewsletter.findById(email);
    return NextResponse.json(
      { message: "fetched single email", foundEmail },
      { status: 200 }
    );
  }
  const emails: any = await ClothNewsletter.find();
  return NextResponse.json(
    { message: "fetched all emails", emails },
    { status: 200 }
  );
}

export async function POST(req: any) {
  const { name, email } = await req.json();
  await connectMongoDB();
  const foundEmail: any = await ClothNewsletter.findOne({ email });
  if (foundEmail) {
    return NextResponse.json(
      { success: false, message: "user already registered" },
      { status: 400 }
    );
  } else {
    const newUserMail: any = await ClothNewsletter.create({
      name,
      email,
    });
    return NextResponse.json(
      { success: true, message: "created a new newsletter user", newUserMail },
      { status: 201 }
    );
  }
}

export async function DELETE(req: any) {
  const email: string = req.nextUrl.searchParams.get("email");
  await connectMongoDB();
  const userEmail = await ClothNewsletter.findOne({ email });
  await ClothNewsletter.findByIdAndDelete(userEmail.id);
  return NextResponse.json(
    { message: "user newsletter  deleted" },
    { status: 200 }
  );
}
