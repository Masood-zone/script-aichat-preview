"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-providers";
import ThemeAnimationHandler from "@/components/ui/theme-handler";

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        themes={["light", "dark", "blue"]}
        defaultTheme="light"
      >
        <ThemeAnimationHandler
          duration={1.2}
          origin="0% 100%"
          colors={{
            light: "#F9FAFC", // alabaster
            dark: "#090B1E", // codGray
            blue: "#009EFF", // dodgerBlue
          }}
        >
          {children}
        </ThemeAnimationHandler>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
