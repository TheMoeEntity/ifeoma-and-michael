import { readClient } from "@/lib/sanity";
import BlessingsCarousel from "./BlessingsCarousel";

interface Blessing {
  _id: string;
  name: string;
  message: string;
}

async function getApprovedBlessings(): Promise<Blessing[]> {
  try {
    return await readClient.fetch(
      `*[_type == "blessing" && approved == true] | order(_createdAt desc) { _id, name, message }`,
      {},
      { next: { tags: ["blessings"] } },
    );
  } catch {
    return [];
  }
}

export default async function BlessingsCarouselServer() {
  const blessings = await getApprovedBlessings();
  return <BlessingsCarousel blessings={blessings} />;
}
