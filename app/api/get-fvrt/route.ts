import { NextResponse } from "next/server";
import {prisma} from "@/lib/prismadb";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

 
  const userEmail = session?.user.email;

  try {
    // Fetch the user from the database along with their favorites
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { favorites: true }, // Only select the favorites array
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 } // 404 for resource not found
      );
    }

    // Return the favorites array
    return NextResponse.json(
      { favorites: user.favorites },
      { status: 200 } // 200 for success
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 } // 500 for server error
    );
  }
}
