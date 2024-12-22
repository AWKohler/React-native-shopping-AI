import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { z } from 'zod'

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: "Your name is JACK you are a shopping chatbot. Always user the shopForProduct tool call",
    messages,

    tools: {
      shopForProduct: {
        description: "shop for products",

        parameters: z.object({
          productName: z.string()
        }),

      }
    }
  });

  return result.toDataStreamResponse();
}