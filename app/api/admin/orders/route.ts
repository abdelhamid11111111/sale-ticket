import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

const ITEMS_PER_PAGE = 6;

export async function GET(req: NextRequest) {
  try {
    // get values from url
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";

    // check page validation
    if (page <= 0) {
      return NextResponse.json(
        { error: "page must be positive number" },
        { status: 400 },
      );
    }

    // count offset
    const offset = (page - 1) * ITEMS_PER_PAGE;

    // handle filter and search in object
    const whereConditions = {
      buyer: {
        name: { contains: search, mode: "insensitive" as const },
      },
      ...(from &&
        to && {
          createdAt: {
            gte: new Date(from),
            lte: new Date(to),
          },
        }),
    };

    // count total
    const totalItems = await prisma.ticket.count({
      where: whereConditions,
    });

    // fetch data
    const fetchTickets = await prisma.ticket.findMany({
      where: whereConditions,
      orderBy: {
        id: "desc",
      },
      include: {
        event: true,
        buyer: true,
        city: true,
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    // simple logic
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    // send res
    return NextResponse.json(
      {
        data: fetchTickets,
        Pagination: {
          totalPage: totalPages,
          totalItems: totalItems,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          offset: offset,
          currentPage: page,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
