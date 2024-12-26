// app/api/register/route.ts
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const email = session?.user.email
    // Check if the email already exists
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!emailExists) {
      return new NextResponse(
        JSON.stringify({ message: "You are not authenticated please login first" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { email },
      data: {
        role:'host'
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Registration error", { status: 500 });
  }
}
