import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "id is not found" }, { status: 400 });
    }

    await prisma.city.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { message: "City deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { CityName } = await req.json();
    const { id } = await params;

    if (!CityName) {
      return NextResponse.json({ error: "input is empty" }, { status: 400 });
    }

    const isExist = await prisma.city.findFirst({
      where: {
        name: CityName,
      },
    });
    if (isExist) {
      return NextResponse.json(
        { error: "is city already exist" },
        { status: 400 },
      );
    }

    const updateName = await prisma.city.update({
      where: {
        id: id,
      },
      data: {
        name: CityName,
      },
    });
    return NextResponse.json(updateName, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
