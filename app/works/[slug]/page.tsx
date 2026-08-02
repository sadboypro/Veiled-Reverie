import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { works, getWork, adjacentWorks } from "@/lib/works";
import { BLUR_DATA_URL } from "@/lib/blur";

type Params = { params: Promise<{ slug: string }> };

// Pre-render every work at build time (SSG); these pages ship as static HTML.
export function generateStaticParams() {
  return works.map((w) => ({ slug: w.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work not found" };

  const description = work.story[0] ?? work.narrative;
  return {
    title: work.title,
    description,
    openGraph: {
      title: `${work.title} | Veiled Reverie`,
      description,
      images: [{ url: work.image, width: 1200, height: 630, alt: work.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${work.title} | Veiled Reverie`,
      description,
      images: [work.image],
    },
  };
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const siblings = adjacentWorks(slug);

  return (
    <>
      <Header />
      <main className="px-6 pt-32 pb-24 md:px-12 md:pt-40">
        <article className="mx-auto max-w-7xl">
          {/* Back */}
          <Reveal trigger="mount">
            <Link
              href="/works"
              className="group inline-flex items-center gap-2 text-sm tracking-wide text-mist transition-colors hover:text-white-sharp"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              All works
            </Link>
          </Reveal>

          {/* Title block */}
          <Reveal trigger="mount" delay={0.05} className="mt-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs tracking-[0.3em] text-smoke uppercase">
                {work.category}
              </span>
            </div>
            <h1 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight text-white-sharp md:text-8xl">
              {work.title}
            </h1>
            <p className="mt-5 max-w-xl text-balance text-mist md:text-lg">
              {work.narrative}
            </p>
          </Reveal>

          {/* Hero frame */}
          <Reveal trigger="mount" delay={0.1} className="mt-12">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-charcoal">
              <Image
                src={work.image}
                alt={work.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1216px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Story + meta */}
          <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-7">
              <div className="space-y-5 text-balance text-mist md:text-lg">
                {work.story.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-5 md:pl-8">
              <dl className="flex flex-col">
                {[
                  { k: "Series", v: work.title },
                  { k: "Category", v: work.category },
                  { k: "Year", v: work.year },
                  { k: "Location", v: work.meta.location },
                  { k: "Made with", v: work.meta.camera },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-6 border-t border-ash/40 py-4 last:border-b"
                  >
                    <dt className="text-xs tracking-[0.2em] text-smoke uppercase">
                      {row.k}
                    </dt>
                    <dd className="text-right text-sm text-bone">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Companion frames */}
          {work.frames.length > 0 && (
            <section className="mt-24">
              <Reveal className="mb-8 flex items-center gap-4">
                <span className="h-px w-8 bg-accent" />
                <span className="text-xs tracking-[0.3em] text-smoke uppercase">
                  From the same series
                </span>
              </Reveal>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
                {work.frames.map((src, i) => (
                  <Reveal key={src} delay={i * 0.08}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                      <Image
                        src={src}
                        alt={`${work.title}, frame ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Prev / next */}
          {siblings && (
            <nav
              aria-label="More works"
              className="mt-24 grid grid-cols-1 gap-px overflow-hidden border-t border-ash/40 sm:grid-cols-2"
            >
              <Link
                href={`/works/${siblings.prev.id}`}
                className="group flex items-center gap-2 py-8 pr-6 text-mist transition-colors hover:text-white-sharp sm:border-r sm:border-ash/40"
              >
                <ArrowLeft
                  size={16}
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
                />
                <span className="flex flex-col">
                  <span className="text-[10px] tracking-[0.3em] text-smoke uppercase">
                    Previous
                  </span>
                  <span className="font-display text-lg text-bone group-hover:text-white-sharp">
                    {siblings.prev.title}
                  </span>
                </span>
              </Link>
              <Link
                href={`/works/${siblings.next.id}`}
                className="group flex items-center justify-end gap-2 py-8 pl-6 text-right text-mist transition-colors hover:text-white-sharp"
              >
                <span className="flex flex-col items-end">
                  <span className="text-[10px] tracking-[0.3em] text-smoke uppercase">
                    Next
                  </span>
                  <span className="font-display text-lg text-bone group-hover:text-white-sharp">
                    {siblings.next.title}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
