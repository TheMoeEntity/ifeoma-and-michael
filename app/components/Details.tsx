import Ornament from "./Ornament";
import WeddingOrnament from "./WeddingOrnament";

function CalendarIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="8"
        width="32"
        height="28"
        rx="2"
        stroke="#C9A84C"
        strokeWidth="1.5"
        fill="none"
      />
      <line x1="4" y1="16" x2="36" y2="16" stroke="#C9A84C" strokeWidth="1.5" />
      <line
        x1="13"
        y1="4"
        x2="13"
        y2="12"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="27"
        y1="4"
        x2="27"
        y2="12"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="10" y="21" width="5" height="4" rx="0.5" fill="#C9A84C" />
      <rect x="17.5" y="21" width="5" height="4" rx="0.5" fill="#C9A84C" />
      <rect x="25" y="21" width="5" height="4" rx="0.5" fill="#C9A84C" />
      <rect x="10" y="28" width="5" height="4" rx="0.5" fill="#C9A84C" />
      <rect x="17.5" y="28" width="5" height="4" rx="0.5" fill="#C9A84C" />
    </svg>
  );
}

const events = [
  {
    label: "Traditional Wedding",
    date: "6th August 2026",
    time: "12:00PM",
    location:
      "Bride's Family Compound at Enuogudu Umuakuma, Okposi, Ohaozara LGA, Ebonyi State.",
  },
  {
    label: "Church Wedding",
    date: "8th August 2026",
    time: "10:30AM",
    location:
      "Assemblies of God Church (AGC) international worship center Mbukobe, Off goddy ogbaga avenue",
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
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-14">
          <WeddingOrnament />
          <div className="flex items-center gap-4 mt-6 w-full">
            <hr className="flex-1 border-gray-300" />
            <h2
              className="text-xs tracking-[0.35em] uppercase text-foreground"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              The Details
            </h2>
            <hr className="flex-1 border-gray-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {events.map((ev) => (
            <div
              key={ev.label}
              className="flex flex-col items-center text-center"
            >
              <CalendarIcon />
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
                className="mt-3 text-sm text-gray-600 leading-relaxed max-w-[220px]"
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
