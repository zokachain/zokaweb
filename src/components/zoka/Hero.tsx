import QuantumField from "./QuantumField";

const Hero = () => (
  <section className="relative h-screen flex flex-col justify-center overflow-hidden">
    {/* monochrome quantum animation */}
    <QuantumField />

    {/* subtle grid */}
    <div className="absolute inset-0 grid-bg opacity-40" />

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
