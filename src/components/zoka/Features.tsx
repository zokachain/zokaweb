const features = [
  {
    code: "01",
    title: "Encrypted by default",
    desc: "Every transaction, contract state and validator message is shielded with zk-SNARKs before it touches the network.",
  },
  {
    code: "02",
    title: "Permissionless validators",
    desc: "Anyone can run a ZOKA node. Consensus is decentralized, censorship-resistant and Sybil-protected by stake.",
  },
  {
    code: "03",
    title: "Private smart contracts",
    desc: "Deploy logic that runs on encrypted inputs. Computation happens, but nobody — not even validators — sees the data.",
  },
  {
    code: "04",
    title: "Selective disclosure",
    desc: "Prove anything without revealing everything. KYC, audits and compliance via cryptographic attestations.",
  },
  {
    code: "05",
    title: "Sub-second finality",
    desc: "BFT consensus with deterministic finality. Built for payments, identity and on-chain inference.",
  },
  {
    code: "06",
    title: "Open source forever",
    desc: "MIT-licensed core, public roadmap, governed by token-holders. No foundation, no gatekeepers.",
  },
];

const Features = () => (
  <section id="privacy" className="py-32 relative">
    <div className="container">
      <div className="max-w-2xl mb-20">
        <div className="font-mono text-xs text-primary mb-4">// PROTOCOL</div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Privacy isn't a feature.<br />
          <span className="text-muted-foreground">It's the substrate.</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          ZOKA rebuilds the blockchain stack from cryptographic primitives upward, so confidentiality is not an opt-in but the default state of the network.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {features.map((f) => (
          <div key={f.code} className="bg-background p-8 hover:bg-card transition-colors group">
            <div className="font-mono text-xs text-primary mb-6">{f.code}</div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
