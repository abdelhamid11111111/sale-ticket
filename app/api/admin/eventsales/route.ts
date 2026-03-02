import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

const ITEMS_PER_PAGE = 6;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || "1");

    if (isNaN(page) || page <= 0) {
      return NextResponse.json(
        { error: "page must be number" },
        { status: 400 },
      );
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    // Fetch once + compute + sort + paginate (1 query, super simple & clean)
    const allEvents = await prisma.event.findMany({
      where: {
        title: { contains: search, mode: "insensitive" },
      },
      include: {
        category: true,
        city: true,
        tickets: {
          select: { quantity: true, totalPrice: true },
        },
      },
    });

    // Map, sort by revenue (highest first), then paginate
    const data = allEvents
      .map((event) => {
        const ticketsSold = event.tickets.reduce( (sum, t) => sum + t.quantity, 0,);
        const revenue = event.tickets.reduce( (sum, t) => sum + Number(t.totalPrice), 0,);

        return {
          id: event.id,
          title: event.title,
          location: event.location,
          city: event.city.name,
          category: event.category.name,
          date: event.eventDate,
          ticketsSold,
          revenue,
        };
      })
      .sort((a, b) => b.revenue - a.revenue) // revenue high → low (0$ events at bottom)
      .slice(offset, offset + ITEMS_PER_PAGE);

    // Optional: if you still need total count
    const totalItems = allEvents.length;

    const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPage;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        data,
        Pagination: {
          totalPage: totalPage,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          offset: offset,
          totalItems: totalItems,
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
