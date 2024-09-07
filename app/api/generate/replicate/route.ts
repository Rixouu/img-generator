import { NextResponse } from 'next/server';
import Replicate from "replicate";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log('Received prompt:', prompt);

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json({ error: 'REPLICATE_API_TOKEN is not set' }, { status: 500 });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt
        }
      }
    ) as string[];

    if (!output || output.length === 0) {
      return NextResponse.json({ error: 'No output from Replicate' }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: output[0] });
  } catch (error) {
    console.error('Error in image generation:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to generate image', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to generate image', details: 'Unknown error' }, { status: 500 });
    }
  }
}