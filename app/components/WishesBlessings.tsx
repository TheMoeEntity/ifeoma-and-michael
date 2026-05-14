import WeddingOrnament from "./WeddingOrnament";
import BlessingForm from "./BlessingForm";

export default async function WishesBlessings() {
  return (
    <section id="wishes" className="py-20 bg-[#f9f7f4]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <WeddingOrnament />
          <div className="flex items-center gap-10 mt-6 w-full">
            <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
            <h2
              className="text-xl tracking-[0.35em] uppercase text-foreground whitespace-nowrap"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              Wishes &amp; <br /> Blessings
            </h2>
            <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
          </div>
          <p
            className="mt-4 text-gray-500 text-center"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Leave us a heartfelt message
          </p>
        </div>

        <BlessingForm />
      </div>
    </section>
  );
}
