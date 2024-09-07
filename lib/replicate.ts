import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("Received prompt:", prompt);

    console.log("Attempting to run model with prompt:", prompt);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.statusText}. ${errorText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to generate image', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to generate image', details: 'Unknown error' }, { status: 500 });
    }
  }
}