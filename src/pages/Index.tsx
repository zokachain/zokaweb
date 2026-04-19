import Nav from "@/components/zoka/Nav";
import Hero from "@/components/zoka/Hero";
import Marquee from "@/components/zoka/Marquee";
import Features from "@/components/zoka/Features";
import Architecture from "@/components/zoka/Architecture";
import Network from "@/components/zoka/Network";
import CTA from "@/components/zoka/CTA";
import Footer from "@/components/zoka/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <Architecture />
      <Network />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
