import { useEffect, useRef } from "react";

/**
 * Hook to manage sticking scroll to bottom of a Radix ScrollArea.
 * Returns refs for container & viewport plus a scheduler function.
 */
export function useStickyScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  const stickToBottomRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const vp = scrollRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement | null;
    if (!vp) return;
    viewportRef.current = vp;

    const onScroll = () => {
      if (!viewportRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      stickToBottomRef.current = distanceFromBottom < 80; // within 80px
    };
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => vp.removeEventListener("scroll", onScroll);
  }, []);

  const scheduleScrollToBottom = () => {
    if (!stickToBottomRef.current) return;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      const el = viewportRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  };

  return { scrollRef, viewportRef, scheduleScrollToBottom } as const;
}
