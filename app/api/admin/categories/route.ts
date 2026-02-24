import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { CategoryName } = body;

    if (!CategoryName) {
      return NextResponse.json({ error: "input is empty" }, { status: 400 });
    }
    const Exist = await prisma.category.findFirst({
      where: {
        name: CategoryName,
      },
    });
    if (Exist) {
      return NextResponse.json(
        { error: "this category already exist" },
        { status: 400 },
      );
    }
    const createCategory = await prisma.category.create({
      data: {
        name: CategoryName,
      },
    });

    return NextResponse.json(createCategory, { status: 201 });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      {
        error: "server error POST",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      {
        error: "server error POST",
      },
      { status: 500 },
    );
  }
}
