import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Unveil from "@/components/Unveil";
import FeaturedGrid from "@/components/FeaturedGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header revealDelay={0.9} />
      <main>
        <Hero />
        <Philosophy />
        <Unveil />
        <FeaturedGrid />
      </main>
      <Footer />
    </>
  );
}
