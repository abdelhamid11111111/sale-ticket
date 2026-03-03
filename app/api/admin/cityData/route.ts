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

    // fetch total of cities
    const totalItems = await prisma.city.count({
      where: {
        name: { contains: search, mode: "insensitive" },
      },
    });

    // fetch all data of cities
    const allCities = await prisma.city.findMany({
      include: {
        tickets: {
          select: {
            quantity: true,
            totalPrice: true,
          },
        },
      },
    });

    // count revenue and total tickets sold per city 
    const rankedList = allCities
      .map((city) => {
        const revenue = city.tickets.reduce(
          (acc, ticket) => acc + parseFloat(ticket.totalPrice.toString()),
          0,
        );
        const ticketsSold = city.tickets.reduce(
          (acc, ticket) => acc + ticket.quantity,
          0,
        );

        return {
          name: city.name,
          ticketsSold,
          revenue,
        };
      })
      .sort((a, b) => b.revenue - a.revenue)  // <- sort by revenue
      .map((city, index) => ({
        ranking: index + 1,                   // <- add ranking
        city: city.name,
        ticketsSold: city.ticketsSold,
        revenue: city.revenue,
      }));

    const data = rankedList
      .filter((item) => item.city.toLowerCase().includes(search.toLowerCase()))  // add search logic
      .slice(offset, offset + ITEMS_PER_PAGE);                                   // then pagination by slice

    const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPage;
    const hasPrevPage = page > 1;

    // this for data visualization to show percentage of revenue each city in total revenue
    const cities = await prisma.city.findMany({
      include: {
        tickets: {
          select: {
            totalPrice: true,
          },
        },
      },
      take: 6
    });
    // fetch only tickets data, i use it to count total revenue
    const tickets = await prisma.ticket.findMany({});

    // count accumulated revenue for each city and total value
    const revenueEach = cities
      .map((city) => {
        const revenue = city.tickets.reduce(
          (acc, ticket) => acc + Number(ticket.totalPrice.toString()),
          0,
        );
        const totalRevenue = tickets.reduce(
          (acc, ticket) => acc + Number(ticket.totalPrice.toString()),
          0,
        );
        return {
          revenue,
          name: city.name,
          totalRevenue: totalRevenue,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);  //    <- sort by revenue

    return NextResponse.json(
      {
        revenueEach: revenueEach,
        data: data,
        Pagination: {
          currentPage: page,
          totalPage: totalPage,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          offset: offset,
          totalItems: totalItems,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server Error" }, { status: 500 });
  }
}
