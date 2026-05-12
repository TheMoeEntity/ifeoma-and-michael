import Header from "./components/Header";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import Details from "./components/Details";
import GiftCouple from "./components/GiftCouple";
import WishesBlessings from "./components/WishesBlessings";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OurStory />
        <Details />
        <GiftCouple />
        <WishesBlessings />
        <RSVP />
      </main>
      <Footer />
    </>
  );
}
