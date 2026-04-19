const Network = () => (
  <section id="network" className="py-32">
    <div className="container">
      <div className="max-w-3xl mb-16">
        <div className="font-mono text-xs text-primary mb-4">// NETWORK</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          A global mesh of <span className="text-gradient">private validators.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-4 gap-px bg-border border border-border">
        {[
          { k: "Validators", v: "2,847", s: "across 64 countries" },
          { k: "Total staked", v: "184M ZOKA", s: "$1.2B at current price" },
          { k: "Daily proofs", v: "48.6M", s: "verified on-chain" },
          { k: "Avg gas", v: "0.0003 ZOKA", s: "≈ $0.002 per tx" },
        ].map((x) => (
          <div key={x.k} className="bg-background p-8">
            <div className="font-mono text-xs text-muted-foreground mb-3">{x.k.toUpperCase()}</div>
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gradient">{x.v}</div>
            <div className="text-xs text-muted-foreground font-mono">{x.s}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default Network;
