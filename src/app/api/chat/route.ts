import { prisma } from "@/db/db";
import {  NextResponse } from "next/server";

export async function GET() {
  try {
    const chats = await prisma.chatdata.findMany();
    if (!chats) return NextResponse.json("Cannot get chat", { status: 400 });
    return NextResponse.json(chats, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const { vector, embeddings } = await req.json();
//     const chat = await prisma.chatdata.create({
//       data: {
//         vector: vector,
//         embedding: embeddings,
//       },
//     });
//     if (!chat)
//       return NextResponse.json("Cannot post chat", { status: 400 });
//     return NextResponse.json(chat, { status: 201 });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json("Internal Server Error", { status: 500 });
//   }
// }
