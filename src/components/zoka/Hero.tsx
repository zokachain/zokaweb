import QuantumField from "./QuantumField";

interface HeroProps {
  onTestnet: () => void;
}

const Hero = ({ onTestnet }: HeroProps) => (
  <section className="relative h-screen flex flex-col justify-center overflow-hidden">
    {/* monochrome quantum animation */}
    <QuantumField />

    {/* subtle grid — kept very faint so the privacy field stays dominant */}
    <div className="absolute inset-0 grid-bg opacity-20" />

    {/* readability scrim behind the headline */}
    <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
      <h1 className="text-[clamp(2rem,5.5vw,5.5rem)] font-extralight leading-[0.95] tracking-[-0.04em] max-w-3xl animate-fade-in">
        A network<br />
        <span className="text-gradient font-light">without witnesses.</span>
      </h1>

      <div className="mt-10 flex items-center gap-4 animate-fade-in">
        <div className="zk-badge font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/70">
          Powered by
        </div>
        <div className="relative font-mono text-sm md:text-base tracking-[0.15em] uppercase font-medium text-foreground/90">
          <span className="zk-melt">Zero-Knowledge Proofs</span>
        </div>
      </div>

      <div className="mt-12 animate-fade-in">
        <button
          onClick={onTestnet}
          className="group relative inline-flex items-center gap-3 px-7 py-3.5 font-mono text-[11px] tracking-[0.3em] uppercase text-white rounded-sm overflow-hidden zoka-cta-red"
          aria-label="Enter the testnet"
        >
          <span className="relative z-10 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Testnet is live
            <span className="opacity-70 group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>
      </div>
    </div>
  </section>
);
export default Hero;
