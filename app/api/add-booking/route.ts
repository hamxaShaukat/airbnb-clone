// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const {
      hotelId,
      adults,
      children,
      infants,
      pets,
      checkInDate,
      checkOutDate,
      totalPrice,
    } = await req.json();

    // Validate required fields
    if (
      !hotelId ||
      adults === undefined ||
      children === undefined ||
      infants === undefined ||
      pets === undefined ||
      !checkInDate ||
      !checkOutDate ||
      totalPrice === undefined
    ) {
      return NextResponse.json(
        { message: "All fields are required", code: 800 },
        { status: 400 }
      );
    }

    // Authenticate the user
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Kindly login first", code: 401 },
        { status: 401 }
      );
    }

    const email = session.user.email;

    // Ensure email is valid
    if (!email) {
      return NextResponse.json(
        { message: "User email is missing", code: 402 },
        { status: 402 }
      );
    }

    // Create booking and update hotel status in a transaction
    const [booking] = await prisma.$transaction([
      // Create the booking
      prisma.booking.create({
        data: {
          hotelId, // Ensure this maps correctly to the Booking model
          adults,
          children,
          infants,
          pets: pets || 0,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          total: totalPrice,
          userEmail: email,
        },
      }),
      // Update the hotel's `isBooked` status
      prisma.hotel.update({
        where: { id: hotelId },
        data: { isBooked: true },
      }),
    ]);

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { message: "Registration error", code: 500 },
      { status: 500 }
    );
  }
}
