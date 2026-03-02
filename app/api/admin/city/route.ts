import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

const ITEMS_PER_PAGE = 6;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("cityrankingpage") || "1");
    const search = searchParams.get("cityrankingsearch") || "";

    if (isNaN(page) || page <= 0) {
      return NextResponse.json(
        { error: "page must be positive number" },
        { status: 400 },
      );
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    const totalItems = await prisma.city.count({
      where: {
        name: { contains: search, mode: "insensitive" },
      },
    });

    const allCities = await prisma.city.findMany({
      include: {
        tickets: {
          select: {
            totalPrice: true,
            quantity: true,
          },
        },
      },
    });

    const rankedList = allCities
      .map((city) => {
        const ticketsSold = city.tickets.reduce(
          (acc, ticket) => acc + Number(ticket.quantity),
          0,
        );
        const revenue = city.tickets.reduce(
          (acc, ticket) => acc + parseFloat(ticket.totalPrice.toString()),
          0,
        );

        return {
          name: city.name,
          ticketsSold,
          revenue,
        };
      })
      .sort((a, b) => b.revenue - a.revenue)   // global sort by revenue
      .map((city, index) => ({
        ranking: index + 1,                    // <- permanent global rank (#1, #2, #8...)
        city: city.name,
        ticketsSold: city.ticketsSold,
        revenue: city.revenue,
      }));

    const data = rankedList
      .filter((item) => item.city.toLowerCase().includes(search.toLowerCase()))
      .slice(offset, offset + ITEMS_PER_PAGE);

    const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPage;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      data: data,
      Pagination: {
        currentPage: page,
        totalPage: totalPage,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        offset: offset,
        totalItems: totalItems,
      },
    }, {status: 200});
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server Error" }, { status: 500 });
  }
}
