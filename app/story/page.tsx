import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { BLUR_DATA_URL } from "@/lib/blur";

const principles = [
  {
    n: "01",
    title: "Light over spectacle",
    body: "I chase the quiet light most people walk past, the half-second before a moment knows it is being watched.",
  },
  {
    n: "02",
    title: "Story over symmetry",
    body: "A frame can be imperfect and still be true. I'd rather keep the tension than tidy it away.",
  },
  {
    n: "03",
    title: "Patience over volume",
    body: "Fewer frames, held longer. The extraordinary tends to arrive when you stop forcing it.",
  },
];

export default function StoryPage() {
  return (
    <>
      <Header />
      <main className="px-6 pt-32 pb-24 md:px-12 md:pt-40">
        {/* Intro */}
        <section className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7 md:pt-10">
            <Reveal trigger="mount" className="mb-4 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs tracking-[0.3em] text-smoke uppercase">
                The Story
              </span>
            </Reveal>

            <Reveal trigger="mount" delay={0.05}>
              <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-white-sharp md:text-7xl">
                Behind the{" "}
                <em className="font-normal text-accent not-italic">Veiled Lens</em>
              </h1>
            </Reveal>

            <Reveal trigger="mount" delay={0.15}>
              <div className="mt-8 space-y-5 text-balance text-mist md:text-lg">
                <p>
                  I&apos;m <span className="text-bone">Prosper Mayaki</span>, the
                  eye behind Veiled Reverie. I make photographs about the things
                  we feel but rarely stop to look at: the weight of a glance, the
                  way a city softens at dusk, the stories hiding inside ordinary
                  afternoons.
                </p>
                <p>
                  Veiled Reverie began as a question: what if every frame held a
                  secret? Years later, that&apos;s still the work: revealing what
                  is felt, not just what is seen.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Portrait */}
          <Reveal
            trigger="mount"
            delay={0.2}
            className="relative aspect-[3/4] overflow-hidden bg-charcoal md:col-span-5"
          >
            <Image
              src="/images/aa.jpg"
              alt="Prosper Mayaki, Veiled Reverie"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
          </Reveal>
        </section>

        {/* Pull quote */}
        <section className="mx-auto my-32 max-w-4xl md:my-48">
          <Reveal>
            <blockquote className="font-display text-3xl font-light leading-snug tracking-tight text-balance text-white-sharp md:text-5xl md:leading-[1.15]">
              &ldquo;Photography is not about capturing what is seen, but{" "}
              <em className="font-normal text-accent not-italic">
                revealing what is felt
              </em>
              .&rdquo;
            </blockquote>
          </Reveal>
        </section>

        {/* Principles */}
        <section className="mx-auto max-w-7xl">
          <h2 className="sr-only">Guiding principles</h2>
          <div className="grid gap-px overflow-hidden border border-ash/40 bg-ash/40 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.12} className="bg-void">
                <div className="p-8 md:p-10">
                  <span className="font-display text-sm text-accent">{p.n}</span>
                  <h3 className="mt-4 font-display text-xl text-white-sharp">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
