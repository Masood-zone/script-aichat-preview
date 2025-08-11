"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

// Context so consumers (ThemeToggle) can trigger animated theme changes
interface ThemeTransitionContextType {
  changeTheme: (next: string) => void;
  isAnimating: boolean;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | null>(
  null
);
export const useThemeTransition = () => {
  const ctx = useContext(ThemeTransitionContext);
  return ctx ?? { changeTheme: () => {}, isAnimating: false };
};

export default function ThemeAnimationHandler({
  children,
  duration = 0.9,
  origin = "0% 100%",
  colors = { light: "#F9FAFC", dark: "#090B1E", blue: "#009EFF" },
}: {
  children: React.ReactNode;
  duration?: number;
  origin?: string;
  colors?: Record<string, string>;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [overlayColor, setOverlayColor] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const targetThemeRef = useRef<string | null>(null);
  const phaseRef = useRef<"idle" | "expand" | "fade">("idle");

  useEffect(() => setMounted(true), []);

  // Disable transitions on underlying elements during animation to avoid flicker
  useEffect(() => {
    const root = document.documentElement;
    if (isAnimating) root.classList.add("theme-transitioning");
    else root.classList.remove("theme-transitioning");
  }, [isAnimating]);

  const changeTheme = useCallback(
    (next: string) => {
      if (!mounted) return;
      if (isAnimating || theme === next) return;
      // Use PREVIOUS theme color while expanding to hide underlying repaint.
      const previousThemeColor = colors[theme ?? "light"] ?? colors.light;
      setOverlayColor(previousThemeColor);
      targetThemeRef.current = next;
      phaseRef.current = "expand";
      setAnimationKey(Date.now());
      setIsAnimating(true);
    },
    [colors, isAnimating, mounted, theme]
  );

  const handleAnimationComplete = () => {
    if (phaseRef.current === "expand") {
      // Switch theme after fully covered.
      if (targetThemeRef.current) setTheme(targetThemeRef.current);
      // Begin fade phase.
      phaseRef.current = "fade";
      // Trigger fade by changing overlayColor slightly (no-op) to force re-render.
      setOverlayColor((o) => o); // noop state update
      return; // We'll render fade animation below.
    }
    // Fade phase done
    phaseRef.current = "idle";
    targetThemeRef.current = null;
    setIsAnimating(false);
    setOverlayColor(null);
  };

  if (!mounted) return null;

  return (
    <ThemeTransitionContext.Provider value={{ changeTheme, isAnimating }}>
      {children}
      <AnimatePresence>
        {overlayColor && (
          <motion.div
            key={animationKey}
            initial={{ clipPath: `circle(0% at ${origin})`, opacity: 1 }}
            animate={
              phaseRef.current === "expand"
                ? { clipPath: `circle(165% at ${origin})`, opacity: 1 }
                : { clipPath: `circle(165% at ${origin})`, opacity: 0 }
            }
            transition={{
              duration:
                phaseRef.current === "expand"
                  ? duration * 0.65
                  : duration * 0.35,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              backgroundColor: overlayColor,
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              pointerEvents: "none",
              willChange: "clip-path, opacity",
            }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>
    </ThemeTransitionContext.Provider>
  );
}
