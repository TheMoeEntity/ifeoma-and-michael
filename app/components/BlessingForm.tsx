"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export default function BlessingForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website: honeypot }),
      });
      if (res.ok) {
        toast.success(
          "Your blessing has been received. It will appear once approved. 🤍",
        );
        setName("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-16">
      {/* Honeypot — hidden from humans, bots fill it in */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="wish-name"
          className="block font-semibold tracking-widest uppercase text-gray-500 mb-2"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="wish-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-5 border rounded-full border-gray-300 bg-[#E8E6E6] py-2 text-foreground focus:outline-none focus:border-gold transition-colors"
          style={{ fontFamily: "var(--font-garamond)" }}
        />
      </div>
      <div className="mb-7">
        <label
          htmlFor="wish-message"
          className="block font-semibold tracking-widest uppercase text-gray-500 mb-2"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          Message for us
        </label>
        <textarea
          id="wish-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          className="w-full border border-gray-300 bg-[#E8E6E6] rounded-3xl p-4 text-foreground focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          style={{ fontFamily: "var(--font-garamond)" }}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={sending}
          className="bg-[#EBAC19] text-white font-medium rounded-full uppercase px-8 py-3 hover:bg-[#EBAC19]/80 transition-colors disabled:opacity-60"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          {sending ? "SENDING…" : "SEND A BLESSING"}
        </button>
      </div>
    </form>
  );
}
