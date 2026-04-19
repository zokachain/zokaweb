const Vision = () => (
  <section className="relative py-48 md:py-64 overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ background: "radial-gradient(circle at 20% 50%, hsl(235 90% 60% / 0.08), transparent 50%)" }}
    />
    <div className="relative max-w-7xl mx-auto px-6 md:px-10">
      <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-16 reveal">
        II. VISION
      </div>
      <div className="max-w-5xl">
        <p className="text-[clamp(1.75rem,4vw,3.5rem)] font-extralight leading-[1.2] tracking-[-0.02em] reveal">
          We imagine a world where{" "}
          <span className="text-gradient">cryptography replaces trust</span>,
          where computation can occur without surveillance, and where
          <span className="text-muted-foreground"> the act of being seen is a choice, not a default.</span>
        </p>
      </div>
    </div>
  </section>
);
export default Vision;
