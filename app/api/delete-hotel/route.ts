import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prismadb';

export async function DELETE(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Hotel ID is required' }, { status: 400 });
  }

  try {
    await prisma.hotel.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete Hotel' }, { status: 500 });
  }
}