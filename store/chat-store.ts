import { create } from "zustand";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (index: number, partial: Partial<Message>) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  selectedModel: "gpt-4",
  temperature: 0.7,
  maxTokens: 2000,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (index, partial) =>
    set((state) => {
      if (index < 0 || index >= state.messages.length) return {} as any;
      const next = [...state.messages];
      next[index] = { ...next[index], ...partial };
      return { messages: next };
    }),
  clearMessages: () => set({ messages: [] }),
}));
