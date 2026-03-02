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

    // fetch all data or data include search value 
    const allEvents = await prisma.event.findMany({
      where: {
        title: {contains: search, mode: 'insensitive'}
      },
      include: {
        city: true,
        category: true,
        tickets: {
          select: {
            totalPrice: true,
            quantity: true
          }
        }
      }
    })

    // trait data we fetch to by sorting and pagination
    const data = allEvents.map((event) => {
      const revenue = event.tickets.reduce((acc, ticket) => acc + parseFloat(ticket.totalPrice.toString()), 0,)
      const totalQuantity = event.tickets.reduce((acc, ticket) => acc + Number(ticket.quantity), 0,)

      return {
        id: event.id,
        title: event.title,
        date: event.eventDate,
        image: event.image,
        location: event.location,
        city: event.city.name,
        category: event.category.name,
        revenue: revenue,
        ticketsSold: totalQuantity
      }

    }).sort((a, b) => b.revenue - a.revenue) // sorting revenue
    .slice(offset, offset + ITEMS_PER_PAGE)

    

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
