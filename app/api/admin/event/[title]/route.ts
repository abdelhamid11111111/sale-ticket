import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ title: string }> },
) {
  try {
    const { title } = await params;

    const eventPage = await prisma.event.findFirst({
      where: {
        title,
      },
      include: {
        category: true,
        city: true
      }
    });
    return NextResponse.json(eventPage, {status: 200})
  } catch (error) {
    console.error("Error ", error);
  }
}
