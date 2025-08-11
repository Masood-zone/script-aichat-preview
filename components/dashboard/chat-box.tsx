"use client";
import React, { useCallback, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { HiOutlinePaperClip } from "react-icons/hi";
import { RiVoiceAiLine } from "react-icons/ri";
import { RiPhoneFindLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useChatStore } from "@/store/chat-store";
import { RiResetLeftLine } from "react-icons/ri";
export default function ChatBox({
  onSend,
  input,
  setInput,
  loading = false,
}: {
  onSend: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}) {
  const { messages, clearMessages } = useChatStore();

  const limit = 3000;
  const remaining = Math.max(0, limit - input.length);
  return (
    <form onSubmit={(e) => onSend(e)} id="chat-form" className="contents">
      <div className="pointer-events-none absolute left-0 right-0 mx-auto bottom-0 top-[448px] w-full bg-gradient-to-t from-background via-background/95 to-transparent h-56" />
      <div className="absolute left-0 right-0 mx-auto top-[495px] bottom-4 w-[90%] sm:w-[65%]">
        <div
          className="w-full overflow-hidden shadow-lg  rounded-2xl bg-white/80 dark:bg-codGray/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-codGray/60 focus:gradient-border border border-border/60"
          tabIndex={0}
        >
          {/* Input */}
          <div className="relative">
            <textarea
              className="w-full h-full bg-transparent resize-none px-4 py-4 outline-none focus:ring-0 focus:border-none leading-relaxed placeholder:text-muted-foreground/60"
              placeholder="Type your message..."
              role="textbox"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Type your message"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  // Handle send message
                  const form = e.currentTarget.closest("form");
                  form?.requestSubmit();
                }
              }}
              rows={1}
            ></textarea>
            <SendButton loading={loading} />
            {messages.length > 0 && (
              <button
                type="button"
                className="absolute right-10 top-3 pr-2 p-2 rounded-md text-primary dark:text-primary focus:outline-none active:outline-none select-none overflow-hidden group "
                onClick={clearMessages}
              >
                <RiResetLeftLine size={20} />
              </button>
            )}
          </div>
          {/* Other options */}
          <div className="flex items-center justify-between px-2 py-1">
            {/* Other Options */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="flex items-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md px-2 py-1 text-xs font-medium text-foreground/80"
              >
                <HiOutlinePaperClip />
                <span className="">Attach</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md px-2 py-1 text-xs font-medium text-foreground/80"
              >
                <RiVoiceAiLine />
                <span>Voice Message</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md px-2 py-1 text-xs font-medium text-foreground/80"
              >
                <RiPhoneFindLine />
                <span>Browse Prompts</span>
              </button>
            </div>
            {/* Text limit - 3000 */}
            <span
              className={`text-[10px] tracking-wide pr-3 font-medium ${
                remaining < 200 ? "text-amber-500" : "text-muted-foreground"
              }`}
            >
              {remaining} characters remaining
            </span>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="mt-2 text-center text-[10px] text-muted-foreground/80">
          Demo chat interface · Responses may be imprecise · Model: GPT-4.1
        </div>
      </div>
    </form>
  );
}

// Send button with ripple + scale click effect
function SendButton({ loading }: { loading: boolean }) {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const addRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== id)), 600);
  }, []);

  return (
    <motion.button
      type="submit"
      aria-label="Send message"
      onClick={addRipple}
      whileTap={{ scale: 0.85, rotate: -5 }}
      whileHover={{ scale: 1.1 }}
      className="absolute right-2 top-3 pr-2 p-2 rounded-md text-primary dark:text-primary focus:outline-none active:outline-none select-none overflow-hidden group"
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
      ) : (
        <>
          <LuSendHorizontal size={22} />
          {ripples.map((r) => (
            <span
              key={r.id}
              className="click-ripple"
              style={{ left: r.x, top: r.y }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
}
