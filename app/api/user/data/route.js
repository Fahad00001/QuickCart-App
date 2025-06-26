import dbConnect from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// api to fetch user dataa
export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "user not found" });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
