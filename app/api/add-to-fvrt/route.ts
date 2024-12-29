import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const email = session?.user.email;

    if (!email) {
      return NextResponse.json(
        {
          message: "Kindly login first to add property to favorites list",
          code: 802,
        },
        { status: 400 }
      );
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "Hotel ID is required",
          code: 4001,
        },
        { status: 400 }
      );
    }

    // Fetch the hotel using Prisma
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      select: { userEmail: true },
    });

    if (!hotel) {
      return NextResponse.json(
        {
          message: "Hotel not found",
          code: 4041,
        },
        { status: 404 }
      );
    }

    // Access the userEmail field
    const userEmail = hotel.userEmail;
    if (userEmail === email) {
      return NextResponse.json(
        {
          message: "Hotel belongs to you, so you cannot make it favorite",
          code: 801,
        },
        { status: 400 }
      );
    }

    // Fetch the user to check if the hotel ID is already in favourites
    const user = await prisma.user.findUnique({
      where: { email },
      select: { favorites: true }, // Fetch only the favorites array
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          code: 4042,
        },
        { status: 404 }
      );
    }

    // Check if the hotel ID is already in the favorites array
    if (user.favorites.includes(id)) {
      return NextResponse.json(
        {
          message: "Hotel is already in your favourites list",
          code: 803,
        },
        { status: 400 }
      );
    }

    // Add the hotel ID to the user's favourites
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        favorites: {
          push: id, // Push the hotel ID to the favourites array
        },
      },
    });

    return NextResponse.json({
      message: "Hotel added to favourites successfully",
      favourites: updatedUser.favorites,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while adding to favourites",
        code: 5001,
      },
      { status: 500 }
    );
  }
}
