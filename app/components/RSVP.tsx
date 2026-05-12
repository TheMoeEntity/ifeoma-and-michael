"use client";

import { useState } from "react";
import Ornament from "./Ornament";
import WeddingOrnament from "./WeddingOrnament";

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
        body: JSON.stringify({ fullName, phone, guests, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setFullName("");
      setPhone("");
      setGuests("1 Guest");
      setMessage("");
    } catch {
      setStatus("error");
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
      <div className="max-w-3xl mx-auto px-6">
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-gold" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        </div>

        <div className="flex flex-col items-center mb-10">
          <WeddingOrnament />
          <div className="flex items-center gap-4 mt-6 w-full">
            <hr className="flex-1 border-gray-200" />
            <h2
              className="text-xs tracking-[0.35em] uppercase text-foreground"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              RSVP
            </h2>
            <hr className="flex-1 border-gray-200" />
          </div>
          <p
            className="mt-4 text-sm text-gray-500 text-center"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Confirm your attendance till the 18th of July
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-xs tracking-widest uppercase text-gray-500 mb-2"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Full Name *
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-gray-100 rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                style={{ fontFamily: "var(--font-garamond)" }}
              />
            </div>
            <div>
              <label
                htmlFor="rsvp-phone"
                className="block text-xs tracking-widest uppercase text-gray-500 mb-2"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Phone Number *
              </label>
              <input
                id="rsvp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-gray-100 rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                style={{ fontFamily: "var(--font-garamond)" }}
              />
            </div>
            <div>
              <label
                htmlFor="rsvp-guests"
                className="block text-xs tracking-widest uppercase text-gray-500 mb-2"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Number of Guests *
              </label>
              <select
                id="rsvp-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-gray-100 rounded-sm px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-gold appearance-none cursor-pointer"
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
              className="block text-xs tracking-widest uppercase text-gray-500 mb-2"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              Message for us
            </label>
            <textarea
              id="rsvp-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
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
              {status === "sending" ? "Confirming…" : "Confirm Attendance"}
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
      </div>
    </section>
  );
}
