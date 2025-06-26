import dbConnect from "@/config/db";
import Address from "@/models/Address";
// import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await dbConnect();
    const addresses = await Address.find({ userId });
    // const { address } = user;
    return NextResponse.json({ success: true, addresses });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
