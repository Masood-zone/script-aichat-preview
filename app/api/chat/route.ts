import { NextRequest } from "next/server";
import { getAzureOpenAIClient, defaultModel } from "@/lib/ai-config";

// Basic runtime config (Edge not yet because openai v4 azure needs fetch polyfills not in edge by default)
export const runtime = "nodejs";

interface IncomingMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, stream } = body as {
      messages: IncomingMessage[];
      stream?: boolean;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages array required" }),
        { status: 400 }
      );
    }

    const apiKeyMissing = !process.env.AZURE_OPENAI_API_KEY;
    if (apiKeyMissing) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY is not set on the server." }),
        { status: 500 }
      );
    }

    const client = getAzureOpenAIClient();

    // Streaming mode
    if (stream) {
      const completion = await client.chat.completions.create({
        messages,
        max_tokens: 4096,
        temperature: 1,
        top_p: 1,
        model: defaultModel,
        stream: true,
      });

      const encoder = new TextEncoder();
      const streamBody = new ReadableStream({
        async start(controller) {
          try {
            for await (const part of completion) {
              const delta = part?.choices?.[0]?.delta?.content || "";
              if (delta) {
                controller.enqueue(encoder.encode(delta));
              }
            }
            controller.close();
          } catch (e) {
            controller.error(e);
          }
        },
      });

      return new Response(streamBody, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
          "Transfer-Encoding": "chunked",
        },
      });
    }

    // Non-streaming (fallback)
    const completion = await client.chat.completions.create({
      messages,
      max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      model: defaultModel,
    });
    const choice = completion.choices?.[0];
    const assistantMessage = choice?.message?.content || "";
    return new Response(
      JSON.stringify({ message: assistantMessage, raw: completion }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Chat route error", err);
    const errorMessage = err instanceof Error ? err.message : "Internal error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
