const Footer = () => (
  <footer className="border-t border-border py-16 bg-card/20">
    <div className="container grid md:grid-cols-5 gap-8">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-mono font-bold mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow shadow-[0_0_12px_hsl(var(--primary))]" />
          ZOKA
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          The privacy layer for a transparent web. Open source, decentralized, owned by no one.
        </p>
      </div>
      {[
        { t: "Protocol", l: ["Whitepaper", "Roadmap", "Tokenomics", "Audits"] },
        { t: "Build", l: ["Docs", "SDK", "Grants", "GitHub"] },
        { t: "Community", l: ["Discord", "X / Twitter", "Forum", "Blog"] },
      ].map((c) => (
        <div key={c.t}>
          <div className="font-mono text-xs text-primary mb-4">{c.t.toUpperCase()}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {c.l.map((i) => <li key={i}><a href="#" className="hover:text-foreground transition-colors">{i}</a></li>)}
          </ul>
        </div>
      ))}
    </div>
    <div className="container mt-12 pt-8 border-t border-border flex flex-wrap justify-between gap-4 font-mono text-xs text-muted-foreground">
      <span>© 2025 ZOKA Foundation · MIT licensed</span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
        MAINNET OPERATIONAL
      </span>
    </div>
  </footer>
);
export default Footer;
