import { ChatMessage } from "@/lib/ai-config";

export interface ChatRequest {
  messages: ChatMessage[];
  stream?: boolean;
}

// Streaming utility: returns an async generator yielding text chunks
export async function* streamChat(
  req: ChatRequest
): AsyncGenerator<string, void, unknown> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...req, stream: true }),
  });
  if (!res.ok || !res.body) {
    const text = await res.text();
    throw new Error(text || "Streaming request failed");
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) {
      yield decoder.decode(value, { stream: true });
    }
  }
}
