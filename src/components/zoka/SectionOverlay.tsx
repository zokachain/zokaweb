import { useEffect } from "react";
import { X, Monitor, Smartphone, Apple, Github, Play } from "lucide-react";
import type { SectionKey } from "./Nav";

interface Props {
  active: SectionKey | null;
  onClose: () => void;
}

const content: Record<SectionKey, { eyebrow: string; title: React.ReactNode; body: React.ReactNode }> = {
  about: {
    eyebrow: "I. ABOUT",
    title: (
      <>
        Privacy is not a feature.<br />
        <span className="text-muted-foreground">It is the precondition of freedom.</span>
      </>
    ),
    body: (
      <p>
        Every transaction, every contract, every identity within ZOKA is shielded
        by zero-knowledge proofs. The network verifies what is true without
        ever observing what is private.
      </p>
    ),
  },
  whitepaper: {
    eyebrow: "II. WHITEPAPER · LITEPAPER",
    title: (
      <>
        Two readings,<br />
        <span className="text-gradient">one private protocol.</span>
      </>
    ),
    body: (
      <div>
        <p>
          Choose your depth. The Whitepaper is the formal cryptographic specification.
          The Litepaper is a plain-language introduction for everyone else.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            {
              id: "01",
              tag: "Technical",
              name: "Whitepaper",
              desc: "Four-layer protocol · zk-SNARKs · MPC · shielded execution. For researchers and engineers.",
              version: "v1.0 · Released",
              href: "/ZOKA_Whitepaper_v1.0.pdf",
              cta: "Read whitepaper",
              FormulaIcon: FileText,
            },
            {
              id: "02",
              tag: "For everyone",
              name: "Litepaper",
              desc: "What ZOKA is, why privacy matters, and how to use it. Plain language, no math required.",
              version: "v1.0 · Released",
              href: "/ZOKA_Litepaper_v1.0.pdf",
              cta: "Read litepaper",
              FormulaIcon: BookOpen,
            },
          ].map((d) => {
            const Icon = d.FormulaIcon;
            return (
              <a
                key={d.id}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-6 border border-border hover:border-foreground transition-colors min-h-[220px]"
              >
                <div className="flex items-start justify-between">
                  <Icon className="w-5 h-5 text-foreground/80" />
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                    {d.tag}
                  </span>
                </div>
                <div className="mt-8">
                  <div className="text-2xl font-extralight text-foreground">{d.name}</div>
                  <div className="text-sm text-muted-foreground font-light mt-2 leading-relaxed">
                    {d.desc}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground inline-flex items-center gap-2">
                    {d.cta}
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
                    {d.version}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    ),
  },
  docs: {
    eyebrow: "III. DOCS",
    title: (
      <>
        Four layers,<br />
        <span className="text-muted-foreground">one private state machine.</span>
      </>
    ),
    body: (
      <div className="space-y-6">
        {[
          { id: "01", name: "Cryptography", desc: "zk-SNARKs · MPC · Homomorphic encryption" },
          { id: "02", name: "Consensus", desc: "Byzantine fault tolerant · sub-second finality" },
          { id: "03", name: "Execution", desc: "Shielded virtual machine · private state" },
          { id: "04", name: "Application", desc: "Encrypted by default · selective disclosure" },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-4 md:col-span-3 text-lg font-light">{l.name}</div>
            <div className="col-span-6 md:col-span-8 text-sm text-muted-foreground font-light">{l.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  github: {
    eyebrow: "IV. GITHUB",
    title: (
      <>
        Open source,<br />
        <span className="text-muted-foreground">verifiable by anyone.</span>
      </>
    ),
    body: (
      <div>
        <p>
          ZOKA is built in the open. The reference implementation, cryptographic
          primitives and node software will be released under permissive licenses.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/ZOKACHAIN"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-foreground transition-colors font-mono text-[11px] tracking-[0.3em] uppercase text-foreground"
          >
            <span>Visit GitHub</span>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
          </a>
        </div>
        <span className="block mt-8 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/70">
          github.com/ZOKACHAIN
        </span>
      </div>
    ),
  },
  wallet: {
    eyebrow: "V. WALLET",
    title: (
      <>
        Your keys,<br />
        <span className="text-gradient">your silence.</span>
      </>
    ),
    body: (
      <div>
        <p>
          The ZOKA wallet is a non-custodial interface to the shielded network.
          Send, receive and prove — without revealing balances, counterparties or intent.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "01", name: "Desktop", desc: "Windows", status: "available", href: "#", Icon: Monitor, badge: ".exe" },
            { id: "02", name: "Android", desc: "APK · Direct download", status: "available", href: "https://github.com/ZOKACHAIN", Icon: Github, badge: "GitHub" },
            { id: "03", name: "Android", desc: "Google Play", status: "available", href: "#", Icon: Play, badge: "Play Store" },
            { id: "04", name: "iOS", desc: "iPhone · iPad", status: "soon", href: null, Icon: Apple, badge: "App Store" },
          ].map((w) => {
            const isSoon = w.status === "soon";
            const Icon = w.Icon;
            const base =
              "group relative flex flex-col justify-between p-5 border border-border transition-colors min-h-[160px]";
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <Icon className="w-5 h-5 text-foreground/80" />
                  <span
                    className={
                      "font-mono text-[10px] tracking-[0.25em] uppercase " +
                      (isSoon ? "text-muted-foreground/70" : "text-foreground")
                    }
                  >
                    {isSoon ? "Coming soon" : "Available"}
                  </span>
                </div>
                <div>
                  <div className="text-lg font-light text-foreground">{w.name}</div>
                  <div className="text-xs text-muted-foreground font-light mt-1">{w.desc}</div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mt-3">
                    {w.badge}
                  </div>
                </div>
              </>
            );
            return isSoon ? (
              <div key={w.id} className={base + " opacity-60 cursor-not-allowed"}>
                {inner}
              </div>
            ) : (
              <a
                key={w.id}
                href={w.href!}
                target={w.href!.startsWith("http") ? "_blank" : undefined}
                rel={w.href!.startsWith("http") ? "noopener noreferrer" : undefined}
                className={base + " hover:border-foreground"}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    ),
  },
};

const SectionOverlay = ({ active, onClose }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!active) return null;
  const data = content[active];

  return (
    <div
      className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(235 90% 60% / 0.12), transparent 60%)" }}
      />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-10 z-10 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative h-full flex items-center overflow-y-auto no-scrollbar pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10 w-full">
          <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-10 uppercase animate-fade-in">
            {data.eyebrow}
          </div>
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.05] tracking-[-0.03em] mb-12 animate-fade-in">
            {data.title}
          </h2>
          <div className="max-w-2xl text-base md:text-lg text-muted-foreground font-light leading-relaxed animate-fade-in">
            {data.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOverlay;
