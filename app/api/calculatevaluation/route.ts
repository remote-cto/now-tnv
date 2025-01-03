// app/api/calculatevaluation/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: body.messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate valuation' },
      { status: 500 }
    );
  }
}