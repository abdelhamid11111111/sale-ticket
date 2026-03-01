import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const eventData = await prisma.event.findMany({});

    const ticketData = await prisma.ticket.findMany({
        include: {
            event: true
        }
    });

    return NextResponse.json(
      { eventData: eventData, ticketData: ticketData },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
