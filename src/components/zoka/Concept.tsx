const Concept = () => (
  <section className="relative py-48 md:py-64">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-16 reveal">
        I. CONCEPT
      </div>
      <div className="grid md:grid-cols-12 gap-10">
        <h2 className="md:col-span-7 text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.05] tracking-[-0.03em] reveal">
          Privacy is not a feature.<br />
          <span className="text-muted-foreground">It is the precondition</span><br />
          <span className="text-muted-foreground">of freedom.</span>
        </h2>
        <div className="md:col-span-4 md:col-start-9 flex items-end">
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed reveal">
            Every transaction, every contract, every identity within ZOKA is shielded
            by zero-knowledge proofs. The network verifies what is true without
            ever observing what is private.
          </p>
        </div>
      </div>
    </div>
  </section>
);
export default Concept;
