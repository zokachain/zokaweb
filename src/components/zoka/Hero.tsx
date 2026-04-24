import QuantumField from "./QuantumField";

const Hero = () => (
  <section className="relative h-screen flex flex-col justify-center overflow-hidden">
    {/* monochrome quantum animation */}
    <QuantumField />

    {/* subtle grid — kept very faint so the privacy field stays dominant */}
    <div className="absolute inset-0 grid-bg opacity-20" />

    {/* readability scrim behind the headline */}
    <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
      <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-10 uppercase animate-fade-in">
        ZOKA / Privacy Protocol
      </div>

      <h1 className="text-[clamp(3rem,9vw,9rem)] font-extralight leading-[0.95] tracking-[-0.04em] max-w-6xl animate-fade-in">
        A network<br />
        <span className="text-gradient font-light">without witnesses.</span>
      </h1>

      <div className="mt-10 flex items-center gap-4 animate-fade-in">
        <div className="zk-badge font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/70">
          Powered by
        </div>
        <div className="relative font-mono text-base md:text-xl tracking-[0.15em] uppercase font-medium text-foreground/90">
          <span className="zk-melt">Zero-Knowledge Proofs</span>
        </div>
      </div>

      <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground font-light leading-relaxed animate-fade-in">
        ZOKA is a cryptographic substrate for value, computation and identity —
        encrypted by mathematics, owned by no one.
      </p>
    </div>
  </section>
);
export default Hero;
