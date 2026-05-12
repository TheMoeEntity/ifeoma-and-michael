"use client";

import { useState } from "react";

export default function BlessingForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mb-16 text-center py-8">
        <p
          className="text-xl text-foreground"
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
        >
          Your blessing has been received. 🤍
        </p>
        <p className="mt-2 text-sm text-gray-500" style={{ fontFamily: "var(--font-garamond)" }}>
          It will appear on the site once approved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-16">
      <div className="mb-5">
        <label
          htmlFor="wish-name"
          className="block text-xs tracking-widest uppercase text-gray-500 mb-2"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          Name *
        </label>
        <input
          id="wish-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-0 border-b border-gray-300 bg-transparent py-2 text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
          style={{ fontFamily: "var(--font-garamond)" }}
        />
      </div>
      <div className="mb-7">
        <label
          htmlFor="wish-message"
          className="block text-xs tracking-widest uppercase text-gray-500 mb-2"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          Message for us
        </label>
        <textarea
          id="wish-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full bg-gray-100 rounded-sm p-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          style={{ fontFamily: "var(--font-garamond)" }}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gold text-white text-xs tracking-widest uppercase px-8 py-3 rounded-sm hover:bg-gold-dark transition-colors disabled:opacity-60"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          {status === "sending" ? "Sending…" : "Drop a Blessing"}
        </button>
      </div>
      {status === "error" && (
        <p
          className="mt-3 text-sm text-red-500 text-center"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
