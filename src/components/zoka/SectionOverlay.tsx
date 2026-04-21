import { useEffect } from "react";
import { X } from "lucide-react";
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
    eyebrow: "II. WHITEPAPER",
    title: (
      <>
        A cryptographic substrate<br />
        <span className="text-gradient">for a private world.</span>
      </>
    ),
    body: (
      <div>
        <p>
          The ZOKA whitepaper outlines a four-layer protocol combining zk-SNARKs,
          secure multi-party computation, and a shielded execution environment.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="/ZOKA_Whitepaper_v1.0.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-border hover:border-foreground transition-colors font-mono text-[11px] tracking-[0.3em] uppercase text-foreground"
          >
            <span>Read whitepaper</span>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
          </a>
          <a
            href="/ZOKA_Whitepaper_v1.0.pdf"
            download
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Download PDF
          </a>
        </div>
        <span className="block mt-8 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/70">
          v1.0 · Released
        </span>
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
      <p>
        ZOKA is built in the open. The reference implementation, cryptographic
        primitives and node software will be released under permissive licenses.
        <span className="block mt-6 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/70">
          github.com/zoka-protocol
        </span>
      </p>
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
      <p>
        The ZOKA wallet is a non-custodial interface to the shielded network.
        Send, receive and prove — without revealing balances, counterparties or intent.
        <span className="block mt-6 font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/70">
          Testnet launching Q3
        </span>
      </p>
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

      <div className="relative h-full flex items-center overflow-y-auto pt-24 pb-16">
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
