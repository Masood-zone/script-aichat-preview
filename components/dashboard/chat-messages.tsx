"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Maximize2, Minimize2 } from "lucide-react";
import { MarkdownMessage } from "./markdown-message";

export interface ChatMessageBubbleProps {
  index: number;
  role: string;
  content: string;
  expanded: boolean;
  onToggleExpand: (index: number) => void;
  onCopy: (text: string) => void;
  isOverflowCandidate: boolean;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  index,
  role,
  content,
  expanded,
  onToggleExpand,
  onCopy,
  isOverflowCandidate,
}) => {
  return (
    <div
      className={`flex gap-3 ${
        role === "user" ? "justify-start" : "justify-start"
      }`}
    >
      {role !== "user" && (
        <div className="mt-1 size-8 shrink-0 rounded-full bg-gradient-to-br from-primary/70 to-primary shadow-inner flex items-center justify-center text-[10px] font-semibold text-primary-foreground select-none">
          AI
        </div>
      )}
      <div
        className={`group relative w-full sm:max-w-[78%] ${
          role === "user" ? "order-2" : ""
        }`}
      >
        <div
          className={`rounded-xl border border-border/50 backdrop-blur-sm ${
            role === "user"
              ? "bg-transparent border rounded-2xl text-primary-foreground shadow-sm"
              : "bg-muted/60 dark:bg-muted/50 text-foreground shadow-sm"
          } px-4 py-3 sm:px-5 sm:py-4 transition-colors ${
            role !== "user" && !expanded ? "max-h-[70vh] overflow-auto" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <MarkdownMessage content={content} onCopyCode={onCopy} />
            </div>
            <div className="flex flex-col gap-1 items-end sticky top-1 self-start">
              {role === "assistant" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-md hover:bg-background/50"
                  onClick={() => onCopy(content)}
                  aria-label="Copy message"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              )}
              {role !== "user" && isOverflowCandidate && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onToggleExpand(index)}
                  aria-label={expanded ? "Collapse message" : "Expand message"}
                >
                  {expanded ? (
                    <Minimize2 className="h-3 w-3" />
                  ) : (
                    <Maximize2 className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {role === "user" && (
        <div className="mt-1 size-8 shrink-0 rounded-full bg-gradient-to-br from-primary/70 to-primary shadow-inner flex items-center justify-center text-[10px] font-semibold text-primary-foreground select-none">
          You
        </div>
      )}
    </div>
  );
};
