const links = ["About", "Whitepaper", "Docs", "GitHub", "Wallet"];

const Nav = () => (
  <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40">
    <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
      <a href="#" className="font-mono text-sm tracking-[0.3em] text-foreground">ZOKA</a>
      <div className="flex items-center gap-6 md:gap-10 font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
        {links.map((l) => (
          <a key={l} href="#" className="hover:text-foreground transition-colors duration-500 uppercase">
            {l}
          </a>
        ))}
      </div>
    </nav>
  </header>
);
export default Nav;
