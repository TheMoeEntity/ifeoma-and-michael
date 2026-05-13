"use client";

import { useState, useEffect, useCallback } from "react";

interface Blessing {
  _id: string;
  name: string;
  message: string;
}

const MAX_VISIBLE =
  typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;

export default function BlessingsCarousel({
  blessings: raw,
}: {
  blessings: Blessing[];
}) {
  // deduplicate in case the server sent repeats
  const blessings = raw.filter(
    (b, i, arr) => arr.findIndex((x) => x._id === b._id) === i,
  );
  const n = blessings.length;

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const advance = useCallback(
    (next: number) => {
      setVisible(false);
      setTimeout(() => {
        setIndex(next % n);
        setVisible(true);
      }, 350);
    },
    [n],
  );

  useEffect(() => {
    if (n <= MAX_VISIBLE) return;
    const timer = setInterval(() => advance((index + 1) % n), 4500);
    return () => clearInterval(timer);
  }, [n, index, advance]);

  if (n === 0) return null;

  const window =
    n <= MAX_VISIBLE
      ? blessings
      : Array.from(
          { length: MAX_VISIBLE },
          (_, k) => blessings[(index + k) % n],
        );

  return (
    <div className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        <div
          className="grid gap-5 md:gap-12"
          style={{
            gridTemplateColumns: `repeat(${window.length}, minmax(0, 1fr))`,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          {window.map(({ _id, name, message }) => (
            <div key={_id} className="text-center">
              <p
                className="text-4xl text-left text-gold leading-none mb-3"
                aria-hidden
              >
                &ldquo;
              </p>
              <p
                className="text-left text-black leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-garamond)",
                }}
              >
                {message}
              </p>
              <p
                className="text-left border-b pb-7 border-black font-medium text-sm tracking-widest text-black"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                {name.toUpperCase()}
              </p>
            </div>
          ))}
        </div>

        {n > MAX_VISIBLE && (
          <div className="flex justify-center gap-2 mt-10">
            {blessings.map((b, i) => (
              <button
                key={b._id}
                aria-label={`Go to blessing ${i + 1}`}
                onClick={() => advance(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === index ? "bg-gold" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
