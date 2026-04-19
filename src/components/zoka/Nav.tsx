const Nav = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <nav className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-mono font-bold tracking-tight">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow shadow-[0_0_12px_hsl(var(--primary))]" />
          ZOKA
          <span className="text-muted-foreground text-xs font-normal">/ privacy chain</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-mono">
          <a href="#protocol" className="hover:text-foreground transition-colors">Protocol</a>
          <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#network" className="hover:text-foreground transition-colors">Network</a>
          <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
        </div>
        <a href="#start" className="text-sm font-mono px-4 py-2 border border-border hover:border-primary hover:text-primary transition-all rounded">
          Launch app →
        </a>
      </nav>
    </header>
  );
};
export default Nav;
