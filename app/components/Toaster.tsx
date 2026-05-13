"use client";

import { useState, useEffect, useCallback } from "react";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
  exiting: boolean;
}

const DURATION = 4000;
const EXIT_DURATION = 200;

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    );
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      EXIT_DURATION,
    );
  }, []);

  useEffect(() => {
    function handle(e: Event) {
      const { type, message } = (
        e as CustomEvent<{ type: "success" | "error"; message: string }>
      ).detail;
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, type, message, exiting: false }]);
      setTimeout(() => dismiss(id), DURATION);
    }
    window.addEventListener("app:toast", handle);
    return () => window.removeEventListener("app:toast", handle);
  }, [dismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-4 left-4 sm:left-auto sm:w-96 z-50 flex flex-col gap-3 items-stretch sm:items-end pointer-events-none">
      {toasts.map(({ id, type, message, exiting }) => (
        <div
          key={id}
          className={`pointer-events-auto flex items-start gap-3 bg-white shadow-2xl rounded-xl px-5 py-4 border-l-4 ${
            type === "success" ? "border-[#EBAC18]" : "border-red-500"
          } ${exiting ? "toast-out" : "toast-in"}`}
        >
          <span
            className={`mt-0.5 flex-shrink-0 text-base ${
              type === "success" ? "text-[#EBAC18]" : "text-red-500"
            }`}
          >
            {type === "success" ? "✓" : "✕"}
          </span>
          <p
            className="text-sm text-gray-800 flex-1 leading-snug"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            {message}
          </p>
          <button
            onClick={() => dismiss(id)}
            aria-label="Dismiss"
            className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0 text-lg leading-none -mt-0.5"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
