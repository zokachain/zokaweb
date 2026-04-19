import BlockchainCanvas from "./BlockchainCanvas";

const Hero = () => (
  <section className="relative h-screen flex flex-col justify-center overflow-hidden">
    {/* animated network */}
    <BlockchainCanvas />

    {/* ambient gradients */}
    <div className="absolute inset-0 grid-bg opacity-60" />
    <div
      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
      style={{ background: "var(--gradient-glow)", animation: "drift 18s ease-in-out infinite" }}
    />
    <div
      className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{ background: "var(--gradient-violet)", animation: "drift 22s ease-in-out infinite reverse" }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
      <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-10 uppercase animate-fade-in">
        ZOKA / Privacy Protocol
      </div>

      <h1 className="text-[clamp(3rem,9vw,9rem)] font-extralight leading-[0.95] tracking-[-0.04em] max-w-6xl animate-fade-in">
        A network<br />
        <span className="text-gradient font-light">without witnesses.</span>
      </h1>

      <p className="mt-12 max-w-xl text-base md:text-lg text-muted-foreground font-light leading-relaxed animate-fade-in">
        ZOKA is a cryptographic substrate for value, computation and identity —
        encrypted by mathematics, owned by no one.
      </p>
    </div>
  </section>
);
export default Hero;
