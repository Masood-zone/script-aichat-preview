import { AzureOpenAI } from "openai";
const apiKey = process.env.AZURE_OPENAI_API_KEY || "";
const apiVersion = "2023-12-01-preview";
const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
export const defaultModel = "gpt-4.1";
const deployment = "gpt-4.1";

let client: AzureOpenAI | null = null;

export function getAzureOpenAIClient() {
  if (!client) {
    client = new AzureOpenAI({
      apiKey,
      endpoint,
      apiVersion,
      deployment: deployment,
    });
  }
  return client;
}

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};
