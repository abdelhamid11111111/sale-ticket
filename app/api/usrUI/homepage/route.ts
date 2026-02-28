import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

const ITEMS_PER_PAGE = 8;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page") || "1");
    const categoryId = searchParams.get("categoryId") || "";

    const offset = (page - 1) * ITEMS_PER_PAGE;

    const categoryCondition: { categoryId?: string } = {};

    if (categoryId !== "" && categoryId !== 'all') {
      categoryCondition.categoryId = categoryId;
    } 

    const totalItems = await prisma.event.count({
      where: categoryCondition,
    });

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const events = await prisma.event.findMany({
      where: categoryCondition,
      orderBy: {
        id: "desc",
      },
      include: {
        category: true,
        city: true,
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
    return NextResponse.json(
      {
        data: events,
        Pagination: {
          currentPage: page,
          totalPage: totalPages,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          totalItems: totalItems,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error GET" }, { status: 500 });
  }
}
