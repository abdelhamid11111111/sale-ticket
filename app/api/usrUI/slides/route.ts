import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";



export async function GET() {
  try {
    const fetchForSlides = await prisma.event.findMany({
      where: {
        eventDate: {
          gt: new Date(), // greater than now = future events
        },
      },
      orderBy: {
        id: "desc",
      },
      include: {
        city: true,
        category: true,
      },
      take: 4,
    });
    return NextResponse.json(fetchForSlides, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
