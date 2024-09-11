import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";
import Users from "../../../lib/model/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoose.connect(connectionStr);
    const data = await req.json();
    const email = data.email;
    const googleTokens = data.googleToken;
    await Users.findOneAndUpdate(
      { email },
      { email, googleTokens },
      { new: true, upsert: true }
    );
    return new Response("Successfully saved user to the database!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("ERROR" + JSON.stringify(error), { status: 500 });
  }
}

export async function GET() {
  await mongoose.connect(connectionStr);
  const data = await Users.find();
  return NextResponse.json(true);
}
