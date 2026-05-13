"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import WeddingOrnament from "./WeddingOrnament";

const hotels = [
  {
    name: "Monabliss Hotels and suite limited",
    address: "Nnorom St, Ntezi Abba, Abakaliki 482112, Ebonyi",
    mapUrl: "#",
  },
  {
    name: "Salt Spring Hotels",
    address: "Mile 50, No 1, Salt Spring Close, Abakaliki, Ebonyi",
    mapUrl: "#",
  },
  {
    name: "Cirens Hotels",
    address: "Diamond Cl, Kpiri Kpiri, Abakaliki 480106, Ebonyi",
    mapUrl: "#",
  },
  {
    name: "Usborn Lapalm Hotels",
    address: "Abakaliki, Ebonyi State",
    mapUrl: "#",
  },
  {
    name: "Ryan Hotels",
    address: "Abakaliki, Ebonyi State",
    mapUrl: "#",
  },
  {
    name: "Sandiego Hotels",
    address: "Abakaliki, Ebonyi State",
    mapUrl: "#",
  },
];

const MAX_VISIBLE = 3;
const n = hotels.length;

export default function WhereToStay() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const advance = useCallback((next: number) => {
    setVisible(false);
    setTimeout(() => {
      setIndex(next % n);
      setVisible(true);
    }, 350);
  }, []);

  useEffect(() => {
    if (n <= MAX_VISIBLE) return;
    const timer = setInterval(() => advance((index + 1) % n), 4500);
    return () => clearInterval(timer);
  }, [index, advance]);

  const window =
    n <= MAX_VISIBLE
      ? hotels
      : Array.from({ length: MAX_VISIBLE }, (_, k) => hotels[(index + k) % n]);

  return (
    <section className="w-full bg-[#f8f8f8] pt-10 pb-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-center justify-center gap-10">
          <div className="h-px flex-1 bg-[#e8a20c]" />
          <div className="text-center flex flex-col items-center justify-center gap-8">
            <WeddingOrnament />
            <h2 className="font-serif text-[18px] uppercase tracking-[0.42em] leading-[1.25] text-black">
              Where To
              <br />
              Stay
            </h2>
          </div>
          <div className="h-px flex-1 bg-[#e8a20c]" />
        </div>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          {window.map((hotel) => (
            <div
              key={hotel.name}
              className="rounded-[24px] border border-[#e6e6e6] bg-[#f8f8f8] px-8 py-7 min-h-[140px]"
            >
              <h3 className="mb-4 font-serif text-[15px] text-[#222]">
                {hotel.name}
              </h3>
              <p className="mb-5 text-[10px] leading-relaxed text-[#9a9a9a]">
                {hotel.address}
              </p>
              <Link
                href={hotel.mapUrl}
                className="inline-flex h-[30px] items-center rounded-[8px] bg-[#eba70d] px-4 text-[10px] font-semibold text-white"
              >
                View On Map
              </Link>
            </div>
          ))}
        </div>

        {n > MAX_VISIBLE && (
          <div className="flex justify-center gap-2 mt-6">
            {hotels.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to hotel ${i + 1}`}
                onClick={() => advance(i)}
                className={`h-[5px] w-[5px] rounded-full transition-colors duration-300 ${
                  i === index ? "bg-[#eba70d]" : "bg-[#d9d9d9]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
