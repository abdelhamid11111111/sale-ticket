import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { saveFile } from "@/lib/upload";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const eventDate = formData.get("eventDate") as string;
    const categoryId = formData.get("categoryId") as string;
    const cityId = formData.get("cityId") as string;
    const image = formData.get("image") as File | null;

    if (
      !title ||
      !description ||
      !location ||
      !price ||
      !eventDate ||
      !categoryId ||
      !cityId ||
      !image
    ) {
      return NextResponse.json(
        { error: "something is required" },
        { status: 400 },
      );
    }

    const isExist = await prisma.event.findFirst({
      where: { title: title },
    });
    if (isExist) {
      return NextResponse.json(
        { error: "event already exist" },
        { status: 400 },
      );
    }

    const parsedDate = new Date(eventDate);
    if (isNaN(parsedDate.getDate())) {
      return NextResponse.json(
        { error: "Invalid event date" },
        { status: 400 },
      );
    }
    if (parsedDate < new Date()) {
      return NextResponse.json(
        { error: "Event date must be in the future" },
        { status: 400 },
      );
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || 0 > parsedPrice) {
      return NextResponse.json(
        { error: "price is not valid" },
        { status: 400 },
      );
    }

    let imagePath = "";
    if (image && image.size > 0) {
      imagePath = await saveFile(image);
    } else {
      return NextResponse.json(
        { error: "Image is not valid" },
        { status: 400 },
      );
    }

    const createEvent = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        price: price.trim(),
        eventDate: new Date(eventDate),
        image: imagePath,
        category: {
          connect: { id: categoryId },
        },
        city: {
          connect: { id: cityId },
        },
      },
      include: {
        category: true,
        city: true,
      },
    });

    return NextResponse.json(createEvent, { status: 201 });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ error: "server error POST" }, { status: 500 });
  }
}

const ITEMS_PER_PAGE = 5;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const searchValue = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || "";

    if (page < 1) {
      return NextResponse.json(
        { error: "page must be positive number" },
        { status: 400 },
      );
    }

    const offset = (page - 1) * ITEMS_PER_PAGE;

    // create empty condition object to use it in count() and findMany()
    const whereCondition: {
      categoryId?: string;
      title?: { contains: string; mode: "insensitive" };
    } = {};

    if (categoryId !== "") {
      whereCondition.categoryId = categoryId;
    }
    if (searchValue !== "") {
      whereCondition.title = { contains: searchValue, mode: "insensitive" };
    }

    const totalItems = await prisma.event.count({
      where: whereCondition,
    });

    const EventsAdmin = await prisma.event.findMany({
      where: whereCondition,
      orderBy: {
        id: "desc",
      },
      include: {
        category: true,
        city: true,
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const hasNextPage = page < totalPage;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        data: EventsAdmin,
        Pagination: {
          currentPage: page,
          totalPage: totalPage,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          totalItems: totalItems,
          offset: offset,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error GET" }, { status: 500 });
  }
}
