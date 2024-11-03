import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ 
            role: "system", 
            content: "You are an expert financial advisor, with in depth knowledge, for example, about earlier repayment of loan.",
          },
          {
            role: "user",
            content: message,
        }],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data from OpenAI" }, { status: 500 });
  }
}
