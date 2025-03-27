import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request:NextRequest) {
  const body = await request.json();

  try {
    // Replace with your AI endpoint and key
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an assistant.' },
          { role: 'user', content: body.prompt },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_APIKEY}`,
        },
      }
    );

    return NextResponse.json({ data: response.data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
