export type SectionKey = "about" | "whitepaper" | "docs" | "github" | "wallet";

const links: { key: SectionKey; label: string }[] = [
  { key: "about", label: "About" },
  { key: "whitepaper", label: "Whitepaper" },
  { key: "docs", label: "Docs" },
  { key: "github", label: "GitHub" },
  { key: "wallet", label: "Wallet" },
];

interface NavProps {
  active: SectionKey | null;
  onSelect: (key: SectionKey) => void;
}

const Nav = ({ active, onSelect }: NavProps) => (
  <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/30">
    <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
      <button
        onClick={() => onSelect("about")}
        className="font-mono text-sm tracking-[0.3em] text-foreground"
        aria-label="ZOKA home"
      >
        ZOKA
      </button>
      <div className="flex items-center gap-6 md:gap-10 font-mono text-[11px] tracking-[0.25em] uppercase">
        {links.map((l) => (
          <button
            key={l.key}
            onClick={() => onSelect(l.key)}
            className={`transition-colors duration-500 ${
              active === l.key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  </header>
);

export default Nav;
