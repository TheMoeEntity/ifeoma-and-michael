"use client";

import { useState } from "react";
import Ornament from "./Ornament";
import WeddingOrnament from "./WeddingOrnament";
import { toast } from "@/lib/toast";

const GUEST_OPTIONS = [
  "1 Guest",
  "2 Guests",
  "3 Guests",
  "4 Guests",
  "5+ Guests",
];

export default function RSVP() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1 Guest");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          guests,
          message,
          website: honeypot,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setFullName("");
        setPhone("");
        setGuests("1 Guest");
        setMessage("");
        toast.success(
          "You're on the list! We can't wait to celebrate with you. 🤍",
        );
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        toast.error(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <section id="rsvp" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <WeddingOrnament />
          <p
            className="mt-8 text-2xl text-foreground"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
          >
            We can&apos;t wait to celebrate with you! 🤍
          </p>
          <p
            className="mt-3 text-sm text-gray-500"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Your attendance has been confirmed.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-10">
          <WeddingOrnament />
          <div className="flex items-center gap-4 mt-6 w-full">
            <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
            <h2
              className="text-xl tracking-[0.35em] uppercase text-foreground"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              RSVP
            </h2>
            <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
          </div>
          <p
            className="mt-4 text-sm text-gray-500 text-center"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Confirm your attendance till the 18th of July
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="rsvp-website">Website</label>
            <input
              id="rsvp-website"
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label
                htmlFor="rsvp-name"
                className="block font-medium tracking-widest uppercase text-gray-500 mb-2"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-[#E8E6E6] rounded-full px-3 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                style={{ fontFamily: "var(--font-garamond)" }}
              />
            </div>
            <div>
              <label
                htmlFor="rsvp-phone"
                className="block font-medium tracking-widest uppercase text-gray-500 mb-2"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="rsvp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-[#E8E6E6] rounded-3xl px-3 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                style={{ fontFamily: "var(--font-garamond)" }}
              />
            </div>
            <div>
              <label
                htmlFor="rsvp-guests"
                className="block font-medium tracking-widest uppercase text-gray-500 mb-2"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <select
                id="rsvp-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-[#E8E6E6] rounded-3xl px-3 py-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-gold appearance-none cursor-pointer"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                {GUEST_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-7">
            <label
              htmlFor="rsvp-message"
              className="block font-medium tracking-widest uppercase text-gray-500 mb-2"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              Message for us
            </label>
            <textarea
              id="rsvp-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full bg-[#E8E6E6] rounded-3xl p-4 text-foreground focus:outline-none focus:ring-1 focus:ring-gold resize-none"
              style={{ fontFamily: "var(--font-garamond)" }}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#EBAC19] text-white font-medium rounded-full uppercase px-8 py-3 hover:bg-[#EBAC19]/80 transition-colors disabled:opacity-60"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              {status === "sending" ? "Confirming…" : "Confirm Attendance"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
