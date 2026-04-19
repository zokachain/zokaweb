const Manifesto = () => (
  <section className="relative py-48 md:py-72 overflow-hidden">
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, hsl(235 90% 60% / 0.1), transparent 60%)" }}
    />
    <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
      <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-16 reveal">
        ⌁
      </div>
      <p className="text-[clamp(1.5rem,3.5vw,3rem)] font-extralight leading-[1.3] tracking-[-0.02em] reveal">
        <span className="text-gradient">ZOKA is not a product.</span><br />
        It is a protocol, a public good,<br />
        <span className="text-muted-foreground">a quiet refusal to be watched.</span>
      </p>
    </div>
  </section>
);
export default Manifesto;
