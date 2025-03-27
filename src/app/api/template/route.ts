import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/db/db";



export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON body
    const { title, description, userId } = body;

    // Validate the input
    if (!title || !description || !userId) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Create the template in the database
    const template = await prisma.template.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
