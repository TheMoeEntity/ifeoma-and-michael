import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeddingOrnament from "./components/WeddingOrnament";

export const metadata = {
  title: "Page Not Found — Ifeoma & Michael 2026",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div
          className="opacity-0"
          style={{
            animation:
              "slideInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards",
          }}
        >
          <WeddingOrnament />
        </div>

        <h1
          className="mt-8 text-[120px] md:text-[180px] leading-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#C9A84C",
            opacity: 0,
            animation:
              "slideInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards",
          }}
        >
          404
        </h1>

        <h2
          className="mt-4 text-2xl md:text-3xl tracking-widest uppercase text-foreground"
          style={{
            fontFamily: "var(--font-cormorant)",
            opacity: 0,
            animation:
              "slideInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards",
          }}
        >
          This page has wandered off
        </h2>

        <p
          className="mt-4 max-w-sm text-base md:text-lg text-[#a2a2a2] leading-relaxed"
          style={{
            fontFamily: "var(--font-garamond)",
            opacity: 0,
            animation:
              "slideInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.55s forwards",
          }}
        >
          Like guests who take a wrong turn, even the best paths lead somewhere
          unexpected. Let us guide you back to the celebration.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          style={{
            opacity: 0,
            animation:
              "slideInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-widest px-8 py-3 rounded-full transition-colors hover:bg-[#C9A84C] hover:text-white"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Return to the Celebration
          </Link>
        </div>

        <div
          className="mt-14"
          style={{
            opacity: 0,
            animation:
              "slideInUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.85s forwards",
          }}
        >
          <WeddingOrnament />
        </div>
      </main>
      <Footer />
    </>
  );
}
