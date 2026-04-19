const CTA = () => (
  <section id="start" className="py-32 border-t border-border relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_60%)]" />
    <div className="container relative z-10 text-center max-w-3xl mx-auto">
      <div className="font-mono text-xs text-primary mb-6">// JOIN</div>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Build on the network<br />that doesn't watch.
      </h2>
      <p className="text-lg text-muted-foreground mb-10">
        Devnet is live. Free testnet ZOKA, full SDK in TypeScript and Rust, and a grant program for privacy-first applications.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="#" className="px-6 py-3 bg-primary text-primary-foreground font-mono text-sm font-semibold rounded glow hover:scale-105 transition-transform">
          Get testnet tokens →
        </a>
        <a href="#" className="px-6 py-3 border border-border hover:border-primary font-mono text-sm rounded transition-all">
          Join Discord
        </a>
      </div>

      <pre className="mt-16 text-left bg-card border border-border border-glow rounded p-6 font-mono text-sm overflow-x-auto noise relative">
{`$ curl -sSf https://install.zoka.network | sh
$ zoka node init --network=mainnet
$ zoka node start --private

  ✓ Cryptographic identity generated
  ✓ Synced with 2,847 peers
  ✓ Encrypted mempool active
  → Validating block #4,829,011`}
      </pre>
    </div>
  </section>
);
export default CTA;
