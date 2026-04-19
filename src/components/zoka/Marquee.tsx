const items = [
  "ZK-SNARKS", "STEALTH ADDRESSES", "ENCRYPTED MEMPOOL", "MPC", "RING SIGNATURES",
  "HOMOMORPHIC", "TOR ROUTING", "SHIELDED POOLS", "PRIVATE SMART CONTRACTS",
];

const Marquee = () => (
  <div className="border-y border-border py-6 overflow-hidden bg-card/30">
    <div className="flex gap-12 marquee whitespace-nowrap">
      {[...items, ...items, ...items].map((it, i) => (
        <span key={i} className="font-mono text-sm text-muted-foreground inline-flex items-center gap-12">
          {it}
          <span className="w-1 h-1 rounded-full bg-primary/60" />
        </span>
      ))}
    </div>
  </div>
);
export default Marquee;
