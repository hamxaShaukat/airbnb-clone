import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET() {
  try {
    const tools = await prisma.hotel.findMany({});
    console.log('first',tools)
    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}