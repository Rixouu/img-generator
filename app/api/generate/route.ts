import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const MODEL_ID = "stabilityai/stable-diffusion-2-1";
const HF_API_KEY = process.env.HF_API_KEY;

export async function POST(request: Request) {
  if (!HF_API_KEY) {
    return NextResponse.json({ error: 'Hugging Face API key is not set' }, { status: 500 });
  }

  const hf = new HfInference(HF_API_KEY);
  
  try {
    const { prompt } = await request.json();
    console.log('Received prompt:', prompt);

    const result = await hf.textToImage({
      model: MODEL_ID,
      inputs: prompt,
      parameters: {
        // You can add additional parameters here if needed
      },
    });

    if (!result) {
      throw new Error('Failed to generate image');
    }

    // The result is a Blob, we need to convert it to a base64 string
    const buffer = await result.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ imageUrl: dataUrl });

  } catch (error) {
    console.error('Error in image generation:', error);
    let errorMessage = 'Failed to generate image';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}