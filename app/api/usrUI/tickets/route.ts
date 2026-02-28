import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { buyerId, cityId, eventId, sessionId, totalPrice, quantity } = body;

    if (
      !buyerId ||
      !cityId ||
      !eventId ||
      !sessionId ||
      !totalPrice ||
      !quantity
    ) {
      return NextResponse.json(
        { error: "Request is missing required identifiers !" },
        { status: 400 },
      );
    }

    const ticket = await prisma.ticket.create({
      data: {
        buyerId,
        cityId,
        eventId,
        sessionId,
        totalPrice,
        quantity,
      },
    });

    return NextResponse.json({ ticketId: ticket.id }, { status: 201 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
