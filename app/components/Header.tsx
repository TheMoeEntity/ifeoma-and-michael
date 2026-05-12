"use client";

import { Download, MailOpen } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-8">
          <a
            href="#our-story"
            className="text-sm tracking-widest text-white/90 hover:text-[var(--gold)] transition-colors font-[family-name:var(--font-garamond)] data-[scrolled]:text-foreground"
            style={{ color: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)" }}
          >
            Our Story
          </a>
          <a
            href="#details"
            className="text-sm tracking-widest transition-colors font-[family-name:var(--font-garamond)]"
            style={{ color: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)" }}
          >
            Details
          </a>
          <a
            href="#gift"
            className="text-sm tracking-widest transition-colors font-[family-name:var(--font-garamond)]"
            style={{ color: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)" }}
          >
            Gift the Couple
          </a>
        </nav>
        <a
          href="/wedding-banner.png"
          download="Ifeoma-and-Michael-Invitation.png"
          className="hidden md:block text-xs tracking-widest px-4 py-2 border rounded-full transition-colors font-[family-name:var(--font-garamond)]"
          style={{
            borderColor: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.7)",
            color: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)",
          }}
        >
          Download Our Invitation
        </a>
        {/* Lucide react icon for wedding */}
        <span title="Download Our Invitation" className="md:hidden">
          <Download
            size={26}
            color={scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)"}
          />
        </span>
      </div>
    </header>
  );
}
