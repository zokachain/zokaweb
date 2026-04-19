const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap justify-between gap-6 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
      <span>ZOKA / 2025</span>
      <span>Open source · MIT</span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-[pulse-soft_2.4s_ease-in-out_infinite]" />
        Mainnet live
      </span>
    </div>
  </footer>
);
export default Footer;
