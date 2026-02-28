import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, phone } = body;

    if (!username || !email || !phone) {
      return NextResponse.json({ error: "server error" }, { status: 400 });
    }

    const createUsr = await prisma.buyer.create({
      data: {
        name: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
      }
    });

    return NextResponse.json({ buyerId: createUsr.id }, { status: 201 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ error: "server error POST" }, { status: 500 });
  }
}
