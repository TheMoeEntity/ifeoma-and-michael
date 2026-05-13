"use client";

import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#our-story", label: "Our Story" },
  { href: "#details", label: "Details" },
  { href: "#gift", label: "Gift the Couple" },
  //   { href: "#wishes", label: "Wishes & Blessings" },
  //   { href: "#rsvp", label: "RSVP" },
];

const INVITE_HREF = "/Ifeoma & Michael's Wedding Invitation.pdf";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const textColor = scrolled ? "#1a1a1a" : "rgba(255,255,255,0.9)";

  return (
    <>
      {/* ── Desktop / shared header bar ── */}
      <header
        className={`absolute md:fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm tracking-widest transition-colors font-[family-name:var(--font-garamond)]"
                style={{ color: textColor }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop download button */}
          <a
            href={INVITE_HREF}
            target="_blank"
            download="Ifeoma-and-Michael-Invitation.pdf"
            className="ml-60 hidden md:inline-flex items-center gap-2 text-xs tracking-widest px-4 py-2 border rounded-full transition-colors font-[family-name:var(--font-garamond)]"
            style={{
              borderColor: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.7)",
              color: textColor,
            }}
          >
            Download Our Invitation
          </a>

          {/* Mobile: spacer so bar doesn't look empty */}
          <div className="md:hidden" />
        </div>
      </header>

      {/* ── Mobile hamburger — fixed at 60px from top, 20px from left ── */}
      <button
        className="md:hidden fixed z-[60]"
        style={{ top: 60, left: 20 }}
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={26} color={menuOpen ? "transparent" : textColor} />
      </button>

      {/* ── Mobile slide-in drawer ── */}
      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-[70] bg-black/50 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white z-[80] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-5 right-5 text-gray-500 hover:text-foreground transition-colors"
        >
          <X size={22} />
        </button>

        {/* Ornamental top accent */}
        <div className="h-1 w-full bg-[#EBAC19]" />

        {/* Nav links */}
        <nav className="flex flex-col pt-16 px-8 gap-7">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-base tracking-widest text-foreground hover:text-[#EBAC19] transition-colors font-[family-name:var(--font-garamond)]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Download button */}
        <div className="px-8 mt-auto pb-10">
          <a
            href={INVITE_HREF}
            target="_blank"
            download="Ifeoma-and-Michael-Invitation.pdf"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full border border-[#EBAC19] text-[#EBAC19] text-xs tracking-widest px-4 py-3 rounded-full font-[family-name:var(--font-garamond)]"
          >
            <Download size={14} />
            Download Invitation
          </a>
        </div>
      </div>
    </>
  );
}
