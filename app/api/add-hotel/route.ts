// app/api/register/route.ts
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      address,
      city,
      country,
      rooms,
      bedrooms, // Changed from Bedrooms
      washrooms, // Changed from Washrooms
      description,
      category,
      images,
      rules,
      facilities,
      adultRent,
      childRent, // Changed from childrenRent
      infantRent, // Changed from infantsRent
      petRent,
    } = await req.json();

    if (
      !name ||
      !description ||
      !category ||
      !images ||
      !rules ||
      !facilities ||
      !adultRent ||
      !childRent ||
      !infantRent ||
      !country ||
      !address ||
      !city ||
      !rooms ||
      !bedrooms ||
      !washrooms
    ) {
      return NextResponse.json(
        {
          message: "All fields are required",
          code: 800,
        },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Kindly Login first" }),
        { status: 400 }
      );
    }
    const email = session.user.email;
    const user = await prisma.hotel.create({
      data: {
        name,
        address,
        city,
        country,
        rooms: rooms ? parseInt(rooms, 10) : 0,
        Bedrooms: bedrooms ? parseInt(bedrooms, 10) : 0,
        Washrooms: washrooms ? parseInt(washrooms, 10) : 0,
        description,
        category,
        averageRating: 0,
        images,
        rules,
        facilities,
        adultRent: adultRent ? parseInt(adultRent, 10) : 0,
        childrenRent: childRent ? parseInt(childRent, 10) : 0,
        infantsRent: infantRent ? parseInt(infantRent, 10) : 0,
        petRent: petRent ? parseInt(petRent, 10) : 0,
        userEmail: email,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Registration error", { status: 500 });
  }
}
