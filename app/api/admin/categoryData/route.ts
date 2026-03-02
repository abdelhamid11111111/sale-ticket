import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    // count total revenue using aggregate
    const totalResult = await prisma.ticket.aggregate({
      _sum: {
        totalPrice: true,
      },
    });

    // turn total revenue into number
    const totalRevenue = Number(totalResult._sum.totalPrice ?? 1);

    // fetch categories
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });

    // to calculate revenue per category.
    const revenueByCategory = await Promise.all(
      //  <-  we use Promise.all waits for all the async database queries for each category to finish, and gives a single array of results.

      // provide categories data into result function to match in id then count sum of total price
      categories.map(async (cat) => {
        const result = await prisma.ticket.aggregate({
          where: {
            event: {
              categoryId: cat.id, // <- ticket.event.categoryId === cat.id
            },
          },
          _sum: {
            totalPrice: true, // <- For each category, sum the totalPrice of tickets where categoryId matches the category’s id.
          },
        });

        return {
          name: cat.name,
          revenue: Number(result._sum.totalPrice ?? 0), // <- turn revenue into number
        };
      }),
    );

    // sort category by revenue
    const sortedRevenueByCategory = revenueByCategory.sort(
      (a, b) => b.revenue - a.revenue,
    ).slice(0, 6)

    return NextResponse.json(
      {
        totalRevenue: totalRevenue,
        sortedRevenueByCategory: sortedRevenueByCategory,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}


// DATA FLOW FOR: result function

// categories array
//       │
//       ▼
//   take cat.id
//       │
//       ▼
// Prisma query on ticket table
//   └─ filter: ticket.event.categoryId === cat.id
//       │
//       ▼
// Fetch all matching tickets (orders)
//       │
//       ▼
// Aggregate totalPrice
//       │
//       ▼
// Return { name: cat.name, revenue: total }
