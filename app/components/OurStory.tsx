import leftArtifact from "@/app/assets/left-artifact.png";
import rightArtifact from "@/app/assets/right-artifact.png";
import WeddingOrnament from "./WeddingOrnament";
import Image from "next/image";

function StoryArtifacts({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 -left-12 md:-left-60 w-10 md:w-14 pointer-events-none select-none">
        <Image
          src={leftArtifact}
          alt=""
          className="object-contain md:object-fill"
          fill
        />
      </div>
      <div className="absolute top-0 bottom-0 -right-12 md:-right-60 w-10 md:w-14 pointer-events-none select-none">
        <Image
          src={rightArtifact}
          alt=""
          className="object-contain md:object-fill"
          fill
        />
      </div>
      {children}
    </div>
  );
}

export default function OurStory() {
  return (
    <section id="our-story" className="py-20 bg-white overflow-x-hidden">
      <div className="flex flex-col items-center mb-12">
        <WeddingOrnament />
        <div className="flex items-center gap-8 mt-6 w-full">
          <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
          <h2
            className="text-xl tracking-[0.35em] uppercase text-foreground"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Our Story
          </h2>
          <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-16 md:px-20 space-y-12">
        {/* Michael */}
        <StoryArtifacts>
          <h3
            className="text-3xl text-center mb-6 text-foreground"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
          >
            Michael
          </h3>
          <div
            className="space-y-5 text-lg leading-relaxed text-center text-(--primary-text)"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            <p>
              It was first year, second semester, we were well into it already.
              I was sitting at the back one evening in the lecture hall where
              CASOR (Christ Ambassador&apos;s Outreach), used to gather every
              Saturday evening and Sunday morning. I loved being in each meeting
              despite the fact I was just a JJC (newbie), because I felt loved
              and accepted.
            </p>
            <p>
              Different things were happening all at the same time; people
              singing, discussing and some reading in such chaos. Then I saw two
              friends, putting curtains up on the wall, decorating in
              preparation for service the next morning. They were laughing and
              working and I couldn&apos;t look away. They looked classy and way
              out of my league but friendly at the same time. I took interest in
              one of them and decided to approach her when they were done.
              Acting on that decision was the genesis of a friendship so
              beautiful and sweet.
            </p>
            <p>
              I walked up to her when they were done and asked to be friends. I
              asked if we could meet the next day after service in the evening
              at the same place and without hesitation she agreed. And there my
              friends is the end of the free trial of this story. subscribe to
              hear more 😊.
            </p>
          </div>
        </StoryArtifacts>

        {/* Ifeoma */}
        <StoryArtifacts>
          <h3
            className="text-3xl text-center mb-6 text-foreground"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
          >
            Ifeoma
          </h3>
          <div
            className="space-y-5 text-lg leading-relaxed text-center text-(--primary-text)"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            <p>
              I entered university excited about freedom, the kind that comes
              with being away from home and finally making my own rules. But
              very quickly, I found something even better; I became a member of
              CASOR, drawn to the joy, the people, and the beauty of a community
              centered on God. Before long, I was fully involved, even serving
              with three different teams in my first year.
            </p>
            <p>
              Along the way, I met Michael someone known for his passion,
              intelligence, and deep faith. What started as a simple friendship
              grew naturally, as we both navigated school and life in our own
              ways.
            </p>
            <p>
              At some point, I became more guarded. My views on friendships,
              especially with the opposite sex, had shifted, and I found myself
              holding back more than usual. But somehow, Michael remained
              different. There was a sincerity about him that made conversations
              easy and genuine, something I didn&apos;t take for granted.
            </p>
            <p>
              Then came a new chapter 😊, he won a scholarship and had to
              relocate. It felt like one of those moments where life quietly
              closes a door, and I assumed that was the end of our story.
            </p>
            <p>But it wasn&apos;t.</p>
            <p>
              Distance, in its own unexpected way, brought clarity. Our
              communication grew stronger, our friendship deepened, and what we
              had began to take on a new meaning. In a way only God could have
              written, what started so simply began unfolding into something far
              more beautiful.
            </p>
          </div>
        </StoryArtifacts>
      </div>
      {/* Closing */}
      <div className="text-center flex gap-20 items-end justify-center">
        <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
        <div className="flex flex-col translate-y-16">
          <p
            className="pt-20 text-xl md:text-2xl tracking-[0.2em] uppercase leading-relaxed text-foreground"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            And well… The rest of the story is
            <br />
            still being written T.O.G.E.T.H.E.R.
          </p>
          <span className="mt-4 text-gray-400 text-lg">🤍</span>
        </div>
        <hr className="flex-1 bg-[#EBAC19] border-[#EBAC19]" />
      </div>
    </section>
  );
}
