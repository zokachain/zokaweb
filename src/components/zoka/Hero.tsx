import heroImg from "@/assets/zoka-hero.jpg";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-border bg-card/50 backdrop-blur font-mono text-xs text-muted-foreground animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            MAINNET v0.2 — ZK-SNARKS LIVE
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] mb-8 animate-fade-up">
            The privacy layer<br />
            <span className="text-gradient">for a transparent web.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-fade-up">
            ZOKA is an open blockchain network where computation, identity and value
            move encrypted by default. Built on zero-knowledge proofs, owned by no one.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up">
            <a href="#start" className="group relative px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded hover:glow transition-all">
              Run a node →
            </a>
            <a href="#docs" className="px-6 py-3 border border-border hover:border-primary text-foreground font-mono text-sm rounded transition-all">
              Read whitepaper
            </a>
          </div>
        </div>

        <div className="relative mt-20 rounded-lg overflow-hidden border border-border border-glow noise">
          <img src={heroImg} alt="ZOKA encrypted blockchain network visualization" className="w-full h-auto opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-6 font-mono text-xs">
            <Stat label="VALIDATORS" value="2,847" />
            <Stat label="ENCRYPTED TX / DAY" value="1.2M" />
            <Stat label="ZK PROOFS" value="48.6M" />
            <Stat label="UPTIME" value="99.99%" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground text-base font-semibold">{value}</span>
  </div>
);

export default Hero;
