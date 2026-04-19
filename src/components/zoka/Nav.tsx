const links = ["About", "Whitepaper", "Docs", "GitHub", "Wallet"];

const Nav = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <nav className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-mono font-bold tracking-tight text-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow shadow-[0_0_12px_hsl(var(--primary))]" />
          ZOKA
        </a>
        <div className="flex items-center gap-6 md:gap-10 text-sm text-muted-foreground font-mono">
          {links.map((l) => (
            <a key={l} href="#" className="hover:text-foreground transition-colors uppercase tracking-wider text-xs">
              {l}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
export default Nav;
