import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prismadb';
import { auth } from '@/auth';

export async function GET() {
    const session = await auth()
    if(!session){
        return new NextResponse(
            JSON.stringify({ message: "You are not authenticated please login first" }),
            { status: 400 }
          );
    }
    const user = session.user.email;
  try {
    const tools = await prisma.hotel.findMany({
        where: { userEmail:user },
    });
    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}