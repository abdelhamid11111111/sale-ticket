import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveFile } from "@/lib/upload";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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
      !cityId
    ) {
      return NextResponse.json(
        { error: "something is required" },
        { status: 400 },
      );
    }

    // check existing event
    const isExist = await prisma.event.findFirst({
      where: { title: title, NOT: { id: id } },
    });
    if (isExist) {
      return NextResponse.json(
        { error: "event already exist" },
        { status: 400 },
      );
    }

    // find existing event
    const currentEvent = await prisma.event.findUnique({
      where: { id: String(id) },
    });

    // check valid date
    const parsedDate = new Date(eventDate);
    if (isNaN(parsedDate.getDate())) {
      return NextResponse.json(
        { error: "Invalid event date" },
        { status: 400 },
      );
    }
    // Only validate future date if the date has changed
    const currentEventDate = currentEvent?.eventDate
      ?.toISOString() // <- turn date into string
      .split("T")[0]; // <- .split("T")[0] takes only the date part → "2025-06-15"
    const incomingDate = parsedDate.toISOString().split("T")[0];

    if (currentEventDate !== incomingDate && parsedDate < new Date()) {
      return NextResponse.json(
        { error: "Event date must be in the future" },
        { status: 400 },
      );
    }

    // check valid price
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || 0 > parsedPrice) {
      return NextResponse.json(
        { error: "price is not valid" },
        { status: 400 },
      );
    }

    // use current img as default value or empty string
    let imagePath = currentEvent?.image || "";

    if (image && image.size > 0) {
      imagePath = await saveFile(image);
    }

    const updateEvent = await prisma.event.update({
      where: {
        id: id,
      },
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

    return NextResponse.json(updateEvent, { status: 201 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error PUT" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.event.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error DELETE" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const fetchEvent = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        city: true,
      },
    });

    return NextResponse.json(fetchEvent, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error DELETE" }, { status: 500 });
  }
}
