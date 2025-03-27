import { prisma } from "@/db/db";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password)
    return NextResponse.json("Credentials missing", { status: 404 });
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return NextResponse.json("User already exist", { status: 409 });

    // hash password
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    if (!user)
      return NextResponse.json("cannot register user", { status: 404 });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    return NextResponse.json(`Internal server error ${err}`, { status: 500 });
  }
}
