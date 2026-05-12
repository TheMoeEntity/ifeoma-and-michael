"use client";

import { useState } from "react";
import Ornament from "./Ornament";
import WeddingOrnament from "./WeddingOrnament";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      onClick={copy}
      aria-label="Copy"
      className="ml-2 text-gray-400 hover:text-gold transition-colors flex-shrink-0"
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8l3.5 3.5L13 4"
            stroke="#C9A84C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect
            x="5"
            y="5"
            width="8"
            height="9"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M3 11V3h8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function GiftCouple() {
  return (
    <section id="gift" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-14">
          <WeddingOrnament />
          <div className="flex items-center gap-4 mt-6 w-full">
            <hr className="flex-1 border-gray-200" />
            <h2
              className="text-xs tracking-[0.35em] uppercase text-foreground"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              Gift the Couple
            </h2>
            <hr className="flex-1 border-gray-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Naira */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3
              className="text-xl font-semibold mb-3 text-foreground"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.4rem",
              }}
            >
              Naira ₦
            </h3>
            <p
              className="text-sm text-gray-700 mb-4"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              Ifeoma Precious Onyebuchi
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <span
                  className="text-xs font-bold tracking-wide text-[#00A651] mr-1"
                  style={{ fontFamily: "var(--font-garamond)" }}
                >
                  ●Pay
                </span>
                <span
                  className="text-sm ml-2 text-gray-800"
                  style={{ fontFamily: "var(--font-garamond)" }}
                >
                  7018183702
                </span>
                <CopyButton value="7018183702" />
              </div>
              <div className="flex items-center">
                <span
                  className="text-xs font-bold tracking-wide text-[#CC0000]"
                  style={{ fontFamily: "var(--font-garamond)" }}
                >
                  ◆ access
                </span>
                <span
                  className="text-sm ml-2 text-gray-800"
                  style={{ fontFamily: "var(--font-garamond)" }}
                >
                  1575614779
                </span>
                <CopyButton value="1575614779" />
              </div>
            </div>
          </div>

          {/* Rubles */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3
              className="text-xl font-semibold mb-3 text-foreground"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.4rem",
              }}
            >
              Rubles ₽
            </h3>
            <p
              className="text-sm text-gray-700 mb-1"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              Iroh Michael Chikaodiri
            </p>
            <div className="flex items-center mb-4">
              <span
                className="text-sm text-gray-800"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                +79777322747
              </span>
              <CopyButton value="+79777322747" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["VTB", "Alpha Bank", "Sber Bank", "Tinkoff Bank"].map(
                (bank) => (
                  <span
                    key={bank}
                    className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-600"
                    style={{ fontFamily: "var(--font-garamond)" }}
                  >
                    {bank}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Favry Couture */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3
              className="text-xl font-semibold mb-4 text-foreground"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.4rem",
              }}
            >
              Favry Couture
            </h3>
            <div className="space-y-2 mb-4">
              {[
                { num: "3002649177", label: "Euro €" },
                { num: "3002649153", label: "Pounds £" },
                { num: "3002649139", label: "Usd $" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center justify-between">
                  <span
                    className="text-sm text-gray-800"
                    style={{ fontFamily: "var(--font-garamond)" }}
                  >
                    {num}—{label}
                  </span>
                  <CopyButton value={num} />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <span
                className="text-xs font-bold text-[#006E3C]"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                GTB
              </span>
              <span
                className="text-xs text-gray-600"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                Guaranty Trust Bank
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
