import ornament from "@/app/assets/sparkles.png";
import Image from "next/image";

export default function WeddingOrnament() {
  return (
    <Image src={ornament} alt="ornament" quality={100} width={40} height={40} />
  );
}
