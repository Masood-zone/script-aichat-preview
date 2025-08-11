"use client";
import React, { useEffect, useState } from "react";
import DashboardWelcome from "./dashboard-welcome";
import ChatBox from "./chat-box";
import { VscRobot } from "react-icons/vsc";
import { useChatStore } from "@/store/chat-store";
import { useStickyScroll } from "@/hooks/use-sticky-scroll";
import { streamChat } from "@/app/api/chat";
import { ChatMessage } from "@/lib/ai-config";
import { ChatMessageBubble } from "./chat-messages";

export default function ChatArea() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const { scrollRef, scheduleScrollToBottom } = useStickyScroll();

  useEffect(() => {
    scheduleScrollToBottom();
  }, [messages.length, scheduleScrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    addMessage({ role: "user", content: userMessage });
    setIsLoading(true);
    try {
      const messagesPayload: ChatMessage[] = [
        ...messages,
        { role: "user", content: userMessage },
      ];
      // Prepare streaming assistant placeholder
      const assistantIndex = messages.length + 1; // after adding user
      addMessage({ role: "assistant", content: "" });
      let accumulated = "";
      for await (const chunk of streamChat({
        messages: messagesPayload,
        stream: true,
      })) {
        accumulated += chunk;
        // Update assistant message progressively
        useChatStore
          .getState()
          .updateMessage(assistantIndex, { content: accumulated });
        scheduleScrollToBottom();
      }
    } catch (error: any) {
      console.error("Chat error", error);
      addMessage({
        role: "assistant",
        content: error.message || "Error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  const toggleExpand = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const isOverflowCandidate = (content: string) => content.length > 800; // heuristic

  return (
    <div className="size-full flex flex-col relative ">
      <div className="flex-1">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center -translate-y-16">
            <DashboardWelcome setInput={setInput} />
          </div>
        )}
        <div
          ref={scrollRef}
          className="h-[59%] overflow-y-auto w-full px-4  pb-40 pt-6 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted/50"
        >
          {messages.map((message, i) => (
            <ChatMessageBubble
              key={i}
              index={i}
              role={message.role}
              content={message.content}
              expanded={expanded.has(i)}
              onToggleExpand={toggleExpand}
              onCopy={copyToClipboard}
              isOverflowCandidate={isOverflowCandidate(message.content)}
            />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground pl-2 animate-pulse">
              <VscRobot className="opacity-70" />
              <span>Thinking…</span>
            </div>
          )}
        </div>
      </div>
      {/* Chat input */}
      <ChatBox
        input={input}
        setInput={setInput}
        onSend={handleSubmit}
        loading={isLoading}
      />
    </div>
  );
}
