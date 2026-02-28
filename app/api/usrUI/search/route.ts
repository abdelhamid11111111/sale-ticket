import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchValue = searchParams.get("query") || "";

    if (!searchValue || searchValue === "") {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 },
      );
    }

    const results = await prisma.event.findMany({
      where: {
        title: { contains: searchValue.toLowerCase(), mode: "insensitive" },
      },
      orderBy: {
        id: "desc",
      },
      include: {
        category: true,
        city: true,
      },
    });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("server error ", error);
    return NextResponse.json({ error: "failed to fetch results" }, { status: 500 });
  }
}
