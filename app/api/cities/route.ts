import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Step 1: Parse body
    const body = await req.json();

    const { CityName } = body;

    // Step 2: Validate input
    if (!CityName || CityName.trim() === "") {
      return NextResponse.json({ error: "input is empty" }, { status: 400 });
    }

    const isExist = await prisma.city.findFirst({
      where: {
        name: CityName,
      },
    });

    if (isExist) {
      return NextResponse.json(
        { error: "this name already exist" },
        { status: 400 },
      );
    }

    const createCityName = await prisma.city.create({
      data: {
        name: CityName,
      },
    });

    return NextResponse.json(createCityName, { status: 201 });
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


export async function GET(){
  try{

    const categories = await prisma.city.findMany({
      orderBy: {
        id: 'desc'
      }
    });

    return NextResponse.json(categories, {status: 200});

  }catch (error) {
    console.error("Error fetching cities:", error);

    return NextResponse.json(
      {
        error: "server error GET",
      },
      { status: 500 },
    );
  }
}