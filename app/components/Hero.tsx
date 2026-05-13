"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import useMobile from "../hooks/useMobile";

const WEDDING_DATE = new Date("2026-08-06T12:00:00");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0)
        return setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

export default function Hero() {
  const { days, hours, mins, secs } = useCountdown(WEDDING_DATE);
  const isMobile = useMobile();
  return (
    <section className="relative w-full h-screen min-h-[480px] md:min-h-[600px]">
      <Image
        src={isMobile ? "/img_banner_mobile.png" : "/wedding-banner.png"}
        alt="Ifeoma and Michael Wedding Banner"
        className="object-center object-cover "
        fill
        priority
      />
      {/* Dark overlay */}
      <div className="md:hidden hero-overlay absolute inset-0 bg-black/45" />

      {/* Names */}
      <div className="hero-names left-5 absolute bottom-42 md:bottom-0 md:top-1/4 md:left-16">
        <h1
          className="text-8xl lg:text-9xl leading-none text-white"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          Ifeoma
          <br />
          &amp;Michael
        </h1>
      </div>

      {/* Bible verse */}
      <div className="hero-verse absolute bottom-8 md:bottom-28 left-5 md:left-16 max-w-xs">
        <p
          className="text-white text-lg md:text-2xl font-semibold tracking-wide mb-1"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          James 1:17
        </p>
        <p
          className="text-sm md:text-base text-white/80 md:text-white leading-relaxed"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          Every good and perfect gift is from above, coming down from the Father
          of the heavenly lights, who does not change like shifting shadows.
          Precious gifts, made for each other from heaven.
        </p>
      </div>

      {/* Countdown */}
      <div className="hero-countdown absolute bottom-88 md:bottom-16 right-4 md:right-16 text-right">
        <div
          className="text-white text-4xl md:text-5xl leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {/* Mobile: 2 columns (Days+Hours / Mins+Secs). Desktop: single column. */}
          <div className="grid grid-cols-2 gap-x-0 md:grid-cols-1">
            <p>
              <span>{days}</span> Days,
            </p>
            <p>
              <span>{hours}</span>
              Hours
            </p>
            <p>
              <span>{mins}</span>
              mins,
            </p>
            <p>
              <span>{secs}</span> Secs
            </p>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        aria-label="Previous"
        className="hero-arrows hidden absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-3xl"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ←
      </button>
      <button
        aria-label="Next"
        className="hero-arrows hidden absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-3xl"
        onClick={() =>
          document
            .getElementById("our-story")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        →
      </button>
    </section>
  );
}
