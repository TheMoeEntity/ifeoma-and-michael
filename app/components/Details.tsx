import Ornament from "./Ornament";
import WeddingOrnament from "./WeddingOrnament";
import { CalendarDays } from "lucide-react";

const events = [
  {
    label: "Traditional Wedding",
    date: "6th August 2026",
    time: "12:00PM",
    location:
      "Location: Bride's Family Compound at Enuogudu Umuakuma, Okposi, Ohaozara LGA, Ebonyi State.",
  },
  {
    label: "Church Wedding",
    date: "8th August 2026",
    time: "10:30AM",
    location:
      "Location: Assemblies of God Church (AGC) international worship center Mbukobe, Off goddy ogbaga avenue",
  },
  {
    label: "Reception Venue",
    date: "8th August 2026",
    time: "After wedding",
    location:
      "Location: MonaBliss Hotel & Suites No.95 Nnorum Street, Abakaliki, Ebonyi State",
  },
];

export default function Details() {
  return (
    <section id="details" className="py-20 bg-[#f9f7f4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-14">
          <WeddingOrnament />
          <div className="flex items-center gap-10 mt-6 w-full">
            <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
            <h2
              className="text-xl tracking-[0.35em] uppercase text-foreground"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              The Details
            </h2>
            <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {events.map((ev) => (
            <div
              key={ev.label}
              className="flex flex-col items-center text-center"
            >
              <CalendarDays size={40} color="#EBAC19" />
              <p
                className="mt-4 text-xs tracking-[0.2em] uppercase text-gray-500"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                {ev.label}
              </p>
              <p
                className="mt-2 text-3xl md:text-4xl leading-tight text-foreground"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
              >
                {ev.date}
              </p>
              <p
                className="text-3xl md:text-4xl leading-tight text-foreground"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
              >
                {ev.time}
              </p>
              <p
                className="mt-3 text-lg text-black leading-relaxed max-w-[220px]"
                style={{ fontFamily: "var(--font-garamond)" }}
              >
                {ev.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
