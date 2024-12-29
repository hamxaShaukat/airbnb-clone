import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(req:NextRequest) {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "You are not authenticated. Please log in first.",
      }),
      { status: 401 } // 401 for unauthorized
    );
  }

  const userEmail = session.user.email;

  const { hId } = await req.json();
  console.log('id',hId)
  try {
    // Fetch the user from the database along with their favorites
    const hotel = await prisma.hotel.findUnique({
      where: { id: hId },
    });

    if (!hotel) {
      return NextResponse.json(
        { message: "hotel not found" },
        { status: 404 } // 404 for resource not found
      );
    }

    // Return the favorites array
    return NextResponse.json(
      { hotel: hotel },
      { status: 200 } // 200 for success
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 } // 500 for server error
    );
  }
}
