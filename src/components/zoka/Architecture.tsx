const layers = [
  { name: "Application", desc: "Wallets, dApps, private DeFi", color: "from-primary/40" },
  { name: "Execution", desc: "ZK-EVM with shielded state", color: "from-emerald-500/30" },
  { name: "Consensus", desc: "Tendermint BFT, sub-second finality", color: "from-cyan-500/30" },
  { name: "Cryptography", desc: "zk-SNARKs · MPC · Homomorphic", color: "from-teal-500/30" },
  { name: "Networking", desc: "Encrypted P2P over QUIC + Tor", color: "from-primary/20" },
];

const Architecture = () => (
  <section id="protocol" className="py-32 border-t border-border bg-card/20">
    <div className="container grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <div className="font-mono text-xs text-primary mb-4">// ARCHITECTURE</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Five layers,<br />one private state machine.
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          A modular stack where each layer enforces confidentiality. Validators verify proofs, not data — making large-scale private computation tractable.
        </p>
        <div className="grid grid-cols-2 gap-4 font-mono text-sm">
          <div className="border border-border p-4 rounded">
            <div className="text-muted-foreground text-xs">BLOCK TIME</div>
            <div className="text-foreground text-lg">~800ms</div>
          </div>
          <div className="border border-border p-4 rounded">
            <div className="text-muted-foreground text-xs">PROOF SIZE</div>
            <div className="text-foreground text-lg">288 B</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {layers.map((l, i) => (
          <div
            key={l.name}
            className={`relative border border-border rounded p-5 bg-gradient-to-r ${l.color} to-transparent hover:border-primary/60 transition-all`}
            style={{ marginLeft: `${i * 12}px` }}
          >
            <div className="flex justify-between items-baseline">
              <span className="font-semibold">{l.name}</span>
              <span className="font-mono text-xs text-muted-foreground">L{5 - i}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{l.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Architecture;
