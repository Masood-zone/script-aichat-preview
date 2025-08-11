"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownMessageProps {
  content: string;
  onCopyCode: (code: string) => void;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({
  content,
  onCopyCode,
}) => {
  const normalize = (c: string) => c.replace(/\\n/g, "\n");
  // Narrow the style type to a generic record to avoid any casts.
  // Style object provided by react-syntax-highlighter theme
  // Cast to expected signature { [key: string]: React.CSSProperties }
  const codeTheme = vscDarkPlus as { [key: string]: React.CSSProperties };
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none [&_*]:leading-relaxed prose-headings:font-semibold prose-pre:!m-0 prose-pre:bg-transparent prose-code:before:hidden prose-code:after:hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-0 mb-3 text-xl font-bold tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-4 mb-2 text-lg font-semibold tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-base font-semibold tracking-tight">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 whitespace-pre-wrap leading-relaxed">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-foreground/90 italic">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/50 pl-3 ml-1 my-3 italic text-foreground/90">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-5 mb-3 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-5 mb-3 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          hr: () => <hr className="my-4 border-t border-border" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border border-border rounded-md">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/60 [&_th]:px-3 [&_th]:py-2">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="[&_td]:px-3 [&_td]:py-2 [&_tr:nth-child(even)]:bg-muted/30">
              {children}
            </tbody>
          ),
          code(codeProps) {
            const { className, children } = codeProps;
            const match = /language-(\w+)/.exec(className || "");
            if (match) {
              const codeString = String(children).replace(/\n$/, "");
              return (
                <div className="relative my-4 rounded-lg bg-zinc-900 text-zinc-50 border border-zinc-700/60 shadow-sm">
                  <button
                    type="button"
                    onClick={() => onCopyCode(codeString)}
                    className="absolute top-2 right-2 rounded bg-zinc-700/60 hover:bg-zinc-600/70 px-2 py-1 text-[10px] font-medium tracking-wide uppercase text-zinc-200 backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    Copy
                  </button>
                  <SyntaxHighlighter
                    style={codeTheme}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      background: "transparent",
                      margin: 0,
                      padding: "1rem 0.85rem",
                      fontSize: "0.75rem",
                      lineHeight: "1.25rem",
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-[0.75rem] font-medium">
                {children}
              </code>
            );
          },
        }}
      >
        {normalize(content)}
      </ReactMarkdown>
    </div>
  );
};
