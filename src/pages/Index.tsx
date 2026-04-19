import Nav from "@/components/zoka/Nav";
import Hero from "@/components/zoka/Hero";
import Concept from "@/components/zoka/Concept";
import Vision from "@/components/zoka/Vision";
import Protocol from "@/components/zoka/Protocol";
import Manifesto from "@/components/zoka/Manifesto";
import Footer from "@/components/zoka/Footer";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />
      <Hero />
      <Concept />
      <Vision />
      <Protocol />
      <Manifesto />
      <Footer />
    </main>
  );
};

export default Index;
