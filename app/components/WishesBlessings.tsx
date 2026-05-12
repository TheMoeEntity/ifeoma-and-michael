import { readClient } from "@/lib/sanity";
import WeddingOrnament from "./WeddingOrnament";
import BlessingForm from "./BlessingForm";

interface Blessing {
  _id: string;
  name: string;
  message: string;
}

async function getApprovedBlessings(): Promise<Blessing[]> {
  try {
    return await readClient.fetch(
      `*[_type == "blessing" && approved == true] | order(_createdAt desc) [0...9] { _id, name, message }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch {
    return [];
  }
}

export default async function WishesBlessings() {
  const blessings = await getApprovedBlessings();

  return (
    <section id="wishes" className="py-20 bg-[#f9f7f4]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <WeddingOrnament />
          <div className="flex items-center gap-4 mt-6 w-full">
            <hr className="flex-1 border-gray-300" />
            <h2
              className="text-xs tracking-[0.35em] uppercase text-foreground whitespace-nowrap"
              style={{ fontFamily: "var(--font-garamond)" }}
            >
              Wishes &amp; Blessings
            </h2>
            <hr className="flex-1 border-gray-300" />
          </div>
          <p
            className="mt-4 text-sm text-gray-500 text-center"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Leave the couple a heartfelt message
          </p>
        </div>

        <BlessingForm />

        {blessings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blessings.map(({ _id, name, message }) => (
              <div key={_id}>
                <p className="text-2xl text-gold mb-3" aria-hidden="true">
                  &ldquo;&rdquo;
                </p>
                <p
                  className="text-sm text-gray-700 leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-garamond)", fontStyle: "italic" }}
                >
                  {message}
                </p>
                <p
                  className="text-xs tracking-widest text-gray-500"
                  style={{ fontFamily: "var(--font-garamond)" }}
                >
                  {name.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
