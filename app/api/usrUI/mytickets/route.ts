import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    // extract value from url in req of frontend
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId id required !" },
        { status: 400 },
      );
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        sessionId: sessionId,
      },
      include: {
        city: true,
        event: true,
        buyer: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
