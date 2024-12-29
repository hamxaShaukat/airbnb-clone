import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import {prisma} from '@/lib/prismadb';

export async function DELETE(request: NextRequest) {
  const session = await auth();

  // Check if the user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await request.json();

  // Validate the request payload
  if (!id) {
    return NextResponse.json({ error: 'Hotel ID is required' }, { status: 400 });
  }

  try {
    // Update the user's fvrts array by removing the provided ID
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email, // Match the authenticated user's email
      },
      data: {
        favorites: {
          set: (await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { favorites: true },
          }))?.favorites.filter((fav:string) => fav !== id), // Remove the ID from the array
        },
      },
    });

    return NextResponse.json({ message: 'Favorite removed successfully', updatedUser });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}
