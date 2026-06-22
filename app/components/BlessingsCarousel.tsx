"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import useMobile from "@/app/hooks/useMobile";

interface Blessing {
  _id: string;
  name: string;
  message: string;
}

const DURATION = 8000;
const FADE = 400;

export default function BlessingsCarousel({
  blessings: raw,
}: {
  blessings: Blessing[];
}) {
  const blessings = raw.filter(
    (b, i, arr) => arr.findIndex((x) => x._id === b._id) === i,
  );
  const n = blessings.length;

  const isMobile = useMobile();
  const maxVisible = isMobile ? 1 : 3;

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(true);

  const go = useCallback(
    (next: number) => {
      setVisible(false);
      setTimeout(() => {
        setIndex(((next % n) + n) % n);
        setVisible(true);
      }, FADE);
    },
    [n],
  );

  // Auto-advance
  useEffect(() => {
    if (!playing || n <= maxVisible) return;
    const id = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(id);
  }, [playing, index, n, go]);

  if (n === 0) return null;

  const slice =
    n <= maxVisible
      ? blessings
      : Array.from({ length: maxVisible }, (_, k) => blessings[(index + k) % n]);

  const showControls = n > maxVisible;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-5">
        {/* Cards */}
        <div
          className="grid gap-5 md:gap-12"
          style={{
            gridTemplateColumns: `repeat(${slice.length}, minmax(0, 1fr))`,
            opacity: visible ? 1 : 0,
            transition: `opacity ${FADE}ms ease`,
          }}
        >
          {slice.map(({ _id, name, message }) => (
            <div key={_id}>
              <p className="text-4xl text-left text-gold leading-none mb-3" aria-hidden>
                &ldquo;
              </p>
              <p
                className="text-left text-black leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-garamond)" }}
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

        {showControls && (
          <div className="mt-8">
            {/* Dots + prev/next/play row */}
            <div className="flex items-center justify-center gap-4">
              {/* Prev */}
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dots — windowed so they never overflow on mobile */}
              <div className="flex items-center gap-1.5 overflow-hidden">
                {(() => {
                  const MAX_DOTS = 5;
                  const half = Math.floor(MAX_DOTS / 2);
                  // Window start clamped so we always show MAX_DOTS (or fewer)
                  const start = Math.min(
                    Math.max(0, index - half),
                    Math.max(0, n - MAX_DOTS),
                  );
                  const end = Math.min(n, start + MAX_DOTS);
                  return blessings.slice(start, end).map((b, offset) => {
                    const i = start + offset;
                    const isActive = i === index;
                    // Shrink + fade the outermost dots when there are more beyond them
                    const isEdge =
                      (offset === 0 && start > 0) ||
                      (offset === end - start - 1 && end < n);
                    return (
                      <button
                        key={b._id}
                        aria-label={`Go to blessing ${i + 1}`}
                        onClick={() => go(i)}
                        style={{
                          width: isActive ? 20 : 8,
                          height: 8,
                          opacity: isEdge ? 0.4 : 1,
                          transform: isEdge ? "scale(0.75)" : "scale(1)",
                          transition:
                            "width 300ms ease, opacity 300ms ease, transform 300ms ease, background-color 300ms ease",
                          flexShrink: 0,
                        }}
                        className={`rounded-full ${isActive ? "bg-gold" : "bg-gray-300"}`}
                      />
                    );
                  });
                })()}
              </div>

              {/* Next */}
              <button
                onClick={() => go(index + 1)}
                aria-label="Next"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronRight size={16} />
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gold text-white hover:bg-gold-dark transition-colors ml-2"
              >
                {playing ? <Pause size={13} /> : <Play size={13} />}
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-4 mx-auto max-w-xs h-0.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                key={`${index}-${playing}`}
                className="h-full bg-gold rounded-full"
                style={{
                  animationName: "carouselProgress",
                  animationDuration: `${DURATION}ms`,
                  animationTimingFunction: "linear",
                  animationFillMode: "forwards",
                  animationPlayState: playing ? "running" : "paused",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
