"use client";

import { useEffect, useState } from "react";

function target(): number {
  // Next drop: 7 days from the first client render, then stable per session.
  const stored = sessionStorage.getItem("zenji-drop-target");
  if (stored) return Number(stored);
  const value = Date.now() + 7 * 24 * 60 * 60 * 1000;
  sessionStorage.setItem("zenji-drop-target", String(value));
  return value;
}

export default function DropCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const deadline = target();
    const tick = () => setRemaining(Math.max(deadline - Date.now(), 0));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const parts = (() => {
    if (remaining === null) return null;
    const totalSeconds = Math.floor(remaining / 1000);
    return [
      { label: "Days", value: Math.floor(totalSeconds / 86400) },
      { label: "Hours", value: Math.floor((totalSeconds % 86400) / 3600) },
      { label: "Minutes", value: Math.floor((totalSeconds % 3600) / 60) },
      { label: "Seconds", value: totalSeconds % 60 },
    ];
  })();

  return (
    <div className="flex gap-3 sm:gap-6">
      {parts
        ? parts.map((part) => (
            <div key={part.label} className="min-w-[62px] sm:min-w-[84px]">
              <span className="block font-display text-3xl tabular-nums text-bone sm:text-5xl">
                {String(part.value).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.24em] text-mist sm:text-[10px]">
                {part.label}
              </span>
            </div>
          ))
        : ["Days", "Hours", "Minutes", "Seconds"].map((label) => (
            <div key={label} className="min-w-[62px] sm:min-w-[84px]">
              <span className="block font-display text-3xl tabular-nums text-mist sm:text-5xl">
                --
              </span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.24em] text-mist sm:text-[10px]">
                {label}
              </span>
            </div>
          ))}
    </div>
  );
}
