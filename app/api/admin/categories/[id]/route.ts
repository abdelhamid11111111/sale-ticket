import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { CategoryName } = body;
    const { id } = await params;

    if (!CategoryName) {
      return NextResponse.json({ error: "input is empty" }, { status: 400 });
    }
    const exiting = await prisma.category.findFirst({
      where: {
        name: CategoryName,
      },
    });
    if (exiting) {
      return NextResponse.json(
        { error: "this category already exist" },
        { status: 400 },
      );
    }
    const updateCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: CategoryName,
      },
    });
    return NextResponse.json(updateCategory, { status: 200 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json(
      {
        error: "server error POST",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "id is not found" }, { status: 400 });
    }
    await prisma.category.delete({
      where: {
        id: String(id),
      },
    });
    return NextResponse.json(
      { message: "City deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
