import Header from "./components/Header";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import Details from "./components/Details";
import GiftCouple from "./components/GiftCouple";
import WishesBlessings from "./components/WishesBlessings";
import BlessingsCarouselServer from "./components/BlessingsCarouselServer";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import WeddingGrid from "./components/WeddingGrid";
import WhereToStay from "./components/WhereToStay";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OurStory />
        <WeddingGrid />
        <Details />
        <GiftCouple />
        {/* <WishesBlessings />
        <BlessingsCarouselServer />
        <RSVP />
        <WhereToStay /> */}
      </main>
      <Footer />
    </>
  );
}
