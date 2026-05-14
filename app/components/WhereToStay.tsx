"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import WeddingOrnament from "./WeddingOrnament";
import useMobile from "@/app/hooks/useMobile";

interface Hotel {
  name: string;
  address: string;
  mapUrl: string;
}

const hotels: Hotel[] = [
  {
    name: "Monabliss Hotels and Suites Limited",
    address: "Nnorom St, Ntezi Abba, Abakaliki, Ebonyi",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.439585918628!2d8.085753774404496!3d6.337063125303035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca0870fa55551%3A0x8050e3bb6b1b0458!2sMonabliss%20Hotels%20and%20suite%20limited!5e0!3m2!1sen!2sng!4v1778741363449!5m2!1sen!2sng",
  },
  {
    name: "Salt Spring Resorts",
    address: "Mile 50, No 1, Salt Spring Close, Abakaliki, Ebonyi",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4527106008495!2d8.090236774404504!3d6.335355325322379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca065492346c9%3A0xb4f3365e7f52fdba!2sSalt%20Spring%20Resort!5e0!3m2!1sen!2sng!4v1778741573527!5m2!1sen!2sng",
  },
  {
    name: "Cirenes Hotels",
    address: "Diamond Cl, Kpiri Kpiri, Abakaliki, Ebonyi",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.392334665487!2d8.093515574404524!3d6.343207725233459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca1acf6dcdd2d%3A0xe3f300edd9e0f422!2sCirenes%20Hotel!5e0!3m2!1sen!2sng!4v1778741754369!5m2!1sen!2sng",
  },
  {
    name: "Osbourn La Palm Royal Resort",
    address: "1, Osbourne Avenue, Mile 50, Ntezi Abba",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31724.3505105953!2d8.03229331083985!3d6.323488200000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca0c001e01f7d%3A0xeed4c22658c3a8ed!2sOsbourn%20La%20Palm%20Royal%20Resort!5e0!3m2!1sen!2sng!4v1778741855815!5m2!1sen!2sng",
  },
  {
    name: "Ryan Hotel and Suites Limited",
    address: "32 Onwe Rd, Abakaliki, Ebonyi",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15862.524532838515!2d8.084161048694416!3d6.312093103355873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca1567b220e5d%3A0x87865cfd71e3e989!2sRyan%20Hotel%20and%20Suites%20Limited!5e0!3m2!1sen!2sng!4v1778741925814!5m2!1sen!2sng",
  },
  {
    name: "San Diego Hotel",
    address: "Enugu - Ogoja Road, Ntezi Abba, Abakaliki, Ebonyi",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4590941414053!2d8.092684474404445!3d6.334524525331747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca07ca4673eb1%3A0x5e99c1571a6cac67!2sSan%20Diego%20Hotel%20Abakaliki!5e0!3m2!1sen!2sng!4v1778742124924!5m2!1sen!2sng",
  },
];

const DURATION = 7000;
const FADE = 350;
const n = hotels.length;

export default function WhereToStay() {
  const isMobile = useMobile();
  const maxVisible = isMobile ? 1 : 3;

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState<Hotel | null>(null);

  const go = useCallback((next: number) => {
    setVisible(false);
    setTimeout(() => {
      setIndex(((next % n) + n) % n);
      setVisible(true);
    }, FADE);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!playing || n <= maxVisible || selected) return;
    const id = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(id);
  }, [playing, index, selected, go]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visibleHotels =
    n <= maxVisible
      ? hotels
      : Array.from({ length: maxVisible }, (_, k) => hotels[(index + k) % n]);

  const showControls = n > maxVisible;

  return (
    <>
      <section className="w-full bg-[#f8f8f8] pt-10 pb-14">
        <div className="mx-auto max-w-5xl px-6">
          {/* Heading */}
          <div className="mb-8 flex items-center justify-center gap-10">
            <div className="h-px flex-1 bg-[#e8a20c]" />
            <div className="text-center flex flex-col items-center justify-center gap-8">
              <WeddingOrnament />
              <h2 className="font-serif text-[18px] uppercase tracking-[0.42em] leading-[1.25] text-black">
                Where To<br />Stay
              </h2>
            </div>
            <div className="h-px flex-1 bg-[#e8a20c]" />
          </div>

          {/* Cards */}
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE}ms ease` }}
          >
            {visibleHotels.map((hotel) => (
              <div
                key={hotel.name}
                className="rounded-[24px] border border-[#e6e6e6] bg-[#f8f8f8] px-8 py-7 min-h-[140px]"
              >
                <h3 className="mb-4 font-serif text-[15px] text-[#222]">{hotel.name}</h3>
                <p className="mb-5 text-[10px] leading-relaxed text-[#9a9a9a]">{hotel.address}</p>
                <button
                  onClick={() => setSelected(hotel)}
                  className="inline-flex h-[30px] items-center rounded-[8px] bg-[#eba70d] px-4 text-[10px] font-semibold text-white hover:bg-[#d4920a] transition-colors"
                >
                  View On Map
                </button>
              </div>
            ))}
          </div>

          {/* Controls */}
          {showControls && (
            <div className="mt-6">
              <div className="flex items-center justify-center gap-4">
                {/* Prev */}
                <button
                  onClick={() => go(index - 1)}
                  aria-label="Previous"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#e6e6e6] text-[#9a9a9a] hover:border-[#eba70d] hover:text-[#eba70d] transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {hotels.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to hotel ${i + 1}`}
                      onClick={() => go(i)}
                      className={`h-[5px] w-[5px] rounded-full transition-colors duration-300 ${
                        i === index ? "bg-[#eba70d]" : "bg-[#d9d9d9]"
                      }`}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => go(index + 1)}
                  aria-label="Next"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#e6e6e6] text-[#9a9a9a] hover:border-[#eba70d] hover:text-[#eba70d] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Play / Pause */}
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Pause" : "Play"}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#eba70d] text-white hover:bg-[#d4920a] transition-colors ml-2"
                >
                  {playing ? <Pause size={13} /> : <Play size={13} />}
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-4 mx-auto max-w-xs h-0.5 bg-[#e6e6e6] rounded-full overflow-hidden">
                <div
                  key={`${index}-${playing}`}
                  className="h-full bg-[#eba70d] rounded-full"
                  style={{
                    animationName: "carouselProgress",
                    animationDuration: `${DURATION}ms`,
                    animationTimingFunction: "linear",
                    animationFillMode: "forwards",
                    animationPlayState: playing && !selected ? "running" : "paused",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Map modal ── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[90] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              key="modal"
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
            >
              <div
                className="pointer-events-auto w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-base text-[#222]" style={{ fontFamily: "var(--font-cormorant)" }}>
                      {selected.name}
                    </h3>
                    <p className="text-[11px] text-[#9a9a9a] mt-0.5" style={{ fontFamily: "var(--font-garamond)" }}>
                      {selected.address}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Close map"
                    className="ml-4 mt-0.5 text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
                <iframe
                  src={selected.mapUrl}
                  className="w-full h-[420px] md:h-[480px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map for ${selected.name}`}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
