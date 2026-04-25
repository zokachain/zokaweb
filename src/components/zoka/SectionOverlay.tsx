import { useEffect, useState } from "react";
import { X, Monitor, Smartphone, Apple, Github, Play, FileText, BookOpen, Plus, Minus } from "lucide-react";
import type { SectionKey } from "./Nav";

interface DocChapter {
  id: string;
  title: string;
  content: React.ReactNode;
}

const docChapters: DocChapter[] = [
  {
    id: "01",
    title: "Six technical pillars",
    content: (
      <div className="space-y-0">
        {[
          { id: "i", name: "Groth16 zk-SNARKs", desc: "Over BLS12-381 · prove validity without revealing values" },
          { id: "ii", name: "Pedersen commitments", desc: "Over Ristretto255 · hide transacted amounts" },
          { id: "iii", name: "Bulletproof ranges", desc: "Prevent overflow-based inflation · ~600 B / proof" },
          { id: "iv", name: "CLSAG ring signatures", desc: "Monero-style · sender hidden within candidate set" },
          { id: "v", name: "Stealth addresses", desc: "Separated scan & spend keys · one-time outputs" },
          { id: "vi", name: "Anonymous transport", desc: "Tor / I2P + Dandelion++ · IP decoupled from tx" },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
            <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "02",
    title: "Hybrid consensus",
    content: (
      <div className="space-y-0">
        {[
          { id: "i", name: "PBFT finality", desc: "Pre-Prepare · Prepare · Commit. 2f+1 signatures yield irreversible finality in < 3 s." },
          { id: "ii", name: "Key-rotating PoW", desc: "RandomX-compatible design. Per-epoch key rotation every 2,048 blocks (~2.8 days). CPU-friendly, ASIC-resistant." },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
            <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "03",
    title: "Five non-negotiable principles",
    content: (
      <div className="space-y-0">
        {[
          { id: "P1", name: "Privacy by default", desc: "No private mode to enable. Every value-bearing tx flows through the private stack or is rejected by the type system." },
          { id: "P2", name: "Mathematically verifiable", desc: "Guarantees derive from primitives with provable properties — not from operational promises." },
          { id: "P3", name: "Honesty about limits", desc: "We do not promise absolute anonymity. A global passive adversary can correlate timing." },
          { id: "P4", name: "Selective auditability", desc: "Derive a view key for an auditor to see incoming txs without the ability to spend." },
          { id: "P5", name: "No single point of trust", desc: "Trust in zk-SNARKs comes from an MPC where one honest contributor suffices." },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
            <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "04",
    title: "Private transaction model",
    content: (
      <div>
        <p className="text-sm text-muted-foreground font-light mb-6 leading-relaxed">
          ZOKA uses a <span className="text-foreground">note model</span> (Zcash-Sapling-style, adapted to CLSAG).
          Each note carries a hidden value, a blinding factor, a spending key, an index in the private commitment
          tree and a stealth address.
        </p>
        <div className="space-y-0">
          {[
            { id: "i", name: "Note selection", desc: "Wallet picks own notes covering value + fee." },
            { id: "ii", name: "CLSAG ring", desc: "Up to 10 candidates (real + decoys). Validators don't know which is real." },
            { id: "iii", name: "zk-SNARK proof", desc: "Balance preserved · no double spend · valid ranges · correct ring." },
            { id: "iv", name: "Pedersen outputs", desc: "Hidden amounts with Bulletproof range proofs." },
            { id: "v", name: "Stealth derivation", desc: "One-time addresses via ECDH with receiver's key." },
            { id: "vi", name: "Encrypted payload", desc: "Amount and blinding factor encrypted with ECDH-derived key." },
          ].map((l) => (
            <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
              <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
              <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
              <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "05",
    title: "zk-SNARK circuits — Groth16 / BLS12-381",
    content: (
      <div>
        <div className="space-y-0">
          {[
            { id: "C1", name: "balance_circuit", desc: "Inputs and outputs preserve total value (conservation)." },
            { id: "C2", name: "merkle_circuit", desc: "A commitment belongs to the tree with a public root." },
            { id: "C3", name: "nullifier_circuit", desc: "Nullifier correctly derived from a valid spending key." },
            { id: "C4", name: "private_tx", desc: "Full tx: balance + membership + range + nullifiers + key images. Up to 96 input slots." },
          ].map((l) => (
            <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border">
              <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
              <div className="col-span-10 md:col-span-4 text-base font-mono text-foreground">{l.name}</div>
              <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[11px]">
          {[
            ["Proof size", "192 B"],
            ["Verify", "~3–5 ms"],
            ["Generate", "0.5–2 s"],
            ["Setup", "MPC ≥ 5"],
          ].map(([k, v]) => (
            <div key={k} className="border border-border p-3">
              <div className="text-muted-foreground tracking-[0.2em] uppercase text-[9px]">{k}</div>
              <div className="text-foreground mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "06",
    title: "What is hidden, what is not",
    content: (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-5 border border-border">
          <div className="text-sm font-mono tracking-[0.2em] uppercase text-foreground mb-4">Hidden</div>
          <ul className="space-y-2 text-sm text-muted-foreground font-light">
            {[
              "Sender address",
              "Receiver address",
              "Amount transferred",
              "Fee paid to miner",
              "Sender & receiver balances",
              "Input ↔ output linkage",
              "Sender's IP (Tor / I2P)",
            ].map((x) => (
              <li key={x} className="flex gap-3"><span className="text-foreground/60">+</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="p-5 border border-border">
          <div className="text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground mb-4">Visible on-chain</div>
          <ul className="space-y-2 text-sm text-muted-foreground font-light">
            {[
              "That a transaction occurred",
              "Approximate timestamp (block)",
              "Categorical tx size",
              "Existence of public commitments",
              "Validator addresses (PBFT set)",
            ].map((x) => (
              <li key={x} className="flex gap-3"><span className="text-muted-foreground/60">−</span>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "07",
    title: "Token economics — ZOK",
    content: (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[11px] mb-6">
          {[
            ["Max supply", "23,000,000"],
            ["Initial reward", "12 ZOK"],
            ["Halving", "~4 years"],
            ["Block time", "120 s"],
            ["Coinbase maturity", "60 blocks"],
            ["Tail emission", "None"],
            ["Max txs / block", "1,000"],
            ["Finality", "< 3 s"],
          ].map(([k, v]) => (
            <div key={k} className="border border-border p-3">
              <div className="text-muted-foreground tracking-[0.2em] uppercase text-[9px]">{k}</div>
              <div className="text-foreground mt-1">{v}</div>
            </div>
          ))}
        </div>
        <div className="space-y-0">
          {[
            { id: "E0", name: "Era 0 · 12 ZOK", desc: "Blocks 0 → 1,051,200 · cumulative 12.6 M ZOK" },
            { id: "E1", name: "Era 1 · 6 ZOK", desc: "Blocks → 2,102,400 · cumulative 18.9 M ZOK" },
            { id: "E2", name: "Era 2 · 3 ZOK", desc: "Blocks → 3,153,600 · cumulative 22.0 M ZOK" },
            { id: "E3", name: "Era 3 · 1 ZOK", desc: "Integer shift exhausts; emission stops at the 23 M cap." },
          ].map((l) => (
            <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
              <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
              <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
              <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "08",
    title: "Fees & MEV protection",
    content: (
      <div className="space-y-0">
        {[
          { id: "i", name: "Private fees", desc: "Hidden under Pedersen commitment with Bulletproof range. Node-configurable floor; wallet hints low / normal / high." },
          { id: "ii", name: "Private coinbase", desc: "Miner reward as private as any tx. Observers see a block was mined, not how much was earned." },
          { id: "iii", name: "MEV-resistant", desc: "Hidden amounts and destinations make sandwich and front-running attacks structurally impossible." },
          { id: "iv", name: "No hidden taxes", desc: "No protocol-level whitelist, blacklist, or fee on holding / sending / receiving." },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
            <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "09",
    title: "Security pillars",
    content: (
      <div className="space-y-0">
        {[
          { id: "S1", name: "Cryptographic primitives", desc: "Groth16 · Bulletproofs · CLSAG · Ristretto255 · BLS12-381 · AES-256-GCM · Argon2id." },
          { id: "S2", name: "Consensus security", desc: "PBFT tolerates ⌊(n−1)/3⌋ Byzantine validators. 50 validators → survives 16 malicious." },
          { id: "S3", name: "Mining security", desc: "Per-epoch key rotation distributes hashrate across CPUs and resists ASIC accumulation." },
          { id: "S4", name: "Network layer", desc: "Tor / I2P + Dandelion++ + uniform padding + mixer batching." },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
            <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "10",
    title: "Node architecture",
    content: (
      <div className="space-y-0">
        {[
          { id: "L7", name: "REST API + interactive CLI", desc: "User interface" },
          { id: "L6", name: "UserNode orchestrator", desc: "Wallet · P2P · State" },
          { id: "L5", name: "PrivateWalletManager · PublicWalletManager", desc: "Wallet management" },
          { id: "L4", name: "PrivateTransactionPool · Public mempool", desc: "Strictly typed pools" },
          { id: "L3", name: "StateManager · PBFT · Block pipeline", desc: "Consensus + state" },
          { id: "L2", name: "Groth16 · Bulletproofs · CLSAG", desc: "Cryptography layer" },
          { id: "L1", name: "libp2p · Dandelion++ · Tor / I2P · Mixer batcher", desc: "Anonymous P2P" },
          { id: "L0", name: "RocksDB", desc: "Blocks + state persistence" },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-10 md:col-span-4 text-base font-mono text-foreground">{l.name}</div>
            <div className="col-span-12 md:col-span-7 text-sm text-muted-foreground font-light">{l.desc}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "11",
    title: "Comparison with other chains",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-left font-light text-sm border border-border">
          <thead className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            <tr className="border-b border-border">
              <th className="p-3">Feature</th>
              <th className="p-3 text-foreground">ZOKA</th>
              <th className="p-3">BTC</th>
              <th className="p-3">ETH</th>
              <th className="p-3">XMR</th>
              <th className="p-3">ZEC</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["Privacy by default", "✓", "—", "—", "✓", "opt"],
              ["Sender hidden", "✓", "—", "—", "✓", "✓"],
              ["Receiver hidden", "✓", "—", "—", "✓", "✓"],
              ["Amount hidden", "✓", "—", "—", "✓", "✓"],
              ["Fee hidden", "✓", "—", "—", "—", "part."],
              ["Finality", "< 3 s", "~60 m", "~15 m", "~20 m", "~75 m"],
              ["ASIC-resistant", "✓", "—", "n/a", "✓", "—"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-border last:border-0">
                <td className="p-3 text-foreground/90">{row[0]}</td>
                <td className="p-3 text-foreground">{row[1]}</td>
                <td className="p-3">{row[2]}</td>
                <td className="p-3">{row[3]}</td>
                <td className="p-3">{row[4]}</td>
                <td className="p-3">{row[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "12",
    title: "Roadmap",
    content: (
      <div className="space-y-0">
        {[
          { id: "i", name: "Internal devnet", desc: "ZK circuits · single-operator setup · 4–7 local validators · CLI.", status: "Done" },
          { id: "ii", name: "Public testnet", desc: "MPC ceremony ≥ 5 contributors · CRS digest baked · Tor/I2P · mixer batching.", status: "Done" },
          { id: "iii", name: "Mainnet", desc: "External audit · code freeze · validator bootstrap · permissionless mining.", status: "In progress" },
          { id: "iv", name: "Post-mainnet", desc: "Native RandomX VM · BIP39 for private wallets · multi-asset · post-quantum migration · bridges.", status: "Planned" },
        ].map((l) => (
          <div key={l.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border last:border-0">
            <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="col-span-10 md:col-span-4 text-base font-light">{l.name}</div>
            <div className="col-span-12 md:col-span-5 text-sm text-muted-foreground font-light">{l.desc}</div>
            <div className="col-span-12 md:col-span-2 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/80 md:text-right">
              {l.status}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "13",
    title: "Honest limits",
    content: (
      <ul className="space-y-3 text-sm font-light text-muted-foreground">
        {[
          "A global passive adversary observing both ends can correlate burst timing.",
          "Groth16 / BLS12-381 is not post-quantum — but past privacy survives.",
          "A compromised spending key has no recovery backdoor. Custody is yours.",
          "Reusing zpriv addresses across distinct off-chain identities can leak associations.",
          "The network never provides involuntary unmasking — only the user can reveal their keys.",
        ].map((x) => (
          <li key={x} className="flex gap-3 border-b border-border pb-3 last:border-0">
            <span className="font-mono text-xs text-muted-foreground/70 mt-1">!</span>
            <span>{x}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

const DocsAccordion = () => {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-12">
      <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
        ZOKA is a Rust blockchain with privacy by default: every value-bearing transaction is, by
        construction, opaque to any observer other than sender or receiver. No economic data is
        ever published in cleartext.
      </p>
      <div className="border-t border-border">
        {docChapters.map((ch) => {
          const isOpen = open === ch.id;
          return (
            <div
              key={ch.id}
              className="border-b border-border scroll-mt-24"
              ref={(el) => {
                if (el && isOpen) {
                  // Bring the opened chapter header into view smoothly
                  requestAnimationFrame(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : ch.id)}
                className="w-full grid grid-cols-12 gap-4 py-6 text-left group items-center"
                aria-expanded={isOpen}
              >
                <div className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">
                  {ch.id}
                </div>
                <div className="col-span-9 md:col-span-10 text-lg md:text-xl font-extralight tracking-[-0.01em] text-foreground group-hover:text-foreground transition-colors">
                  {ch.title}
                </div>
                <div className="col-span-1 flex justify-end text-muted-foreground group-hover:text-foreground transition-colors">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {isOpen && (
                <div className="pb-8 pl-0 md:pl-[8.333%] animate-fade-in">
                  {ch.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Props {
  active: SectionKey | null;
  onClose: () => void;
}

const content: Record<SectionKey, { eyebrow: string; title: React.ReactNode; body: React.ReactNode }> = {
  about: {
    eyebrow: "I. ABOUT · A MANIFESTO",
    title: (
      <>
        Privacy is not a feature.<br />
        <span className="text-muted-foreground">It is the precondition of freedom.</span>
      </>
    ),
    body: (
      <div className="space-y-12">
        {/* Author signature */}
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center font-mono text-[11px] tracking-[0.15em] text-foreground">
            NZ
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-foreground">
              Written by Natosh Zoka
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              core dev @ Zokachain
            </span>
          </div>
        </div>

        {/* Opening */}
        <div className="space-y-6">
          <p className="text-lg md:text-xl font-extralight leading-relaxed text-foreground">
            I did not build ZOKA to launch a token. I built it because I believe the right to
            transact in private is the last frontier of individual freedom — and that frontier
            is being eroded, block by block, ledger by ledger, in front of our eyes.
          </p>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            What follows is not a pitch. It is a position. If you disagree with it, ZOKA is
            probably not for you. If you read it and feel something settle into place, then
            welcome — you are already part of this.
          </p>
        </div>

        {/* Manifesto chapters */}
        <div className="space-y-0 border-t border-border">
          {[
            {
              id: "01",
              title: "Privacy is the default state of being human",
              body: (
                <>
                  Before currency, before contracts, before institutions — humans whispered.
                  We chose, in private, who to trust with our intentions. Privacy is not a
                  modern legal construct invented by lawyers; it is the default operating
                  mode of every honest social interaction. Anything that turns it into an
                  exception is the anomaly, not the other way around.
                </>
              ),
            },
            {
              id: "02",
              title: "A transparent ledger is a surveillance ledger",
              body: (
                <>
                  Bitcoin was a beautiful idea — but a fully transparent chain is, in
                  practice, a permanent surveillance database that anyone, including states
                  and corporations, can mine forever. Every coffee, every salary, every
                  donation — visible, correlatable, immutable. <span className="text-foreground">"Pseudonymous"</span> is
                  not privacy. It is a thin curtain in a room full of cameras.
                </>
              ),
            },
            {
              id: "03",
              title: "Standing on the shoulders of cypherpunks",
              body: (
                <>
                  ZOKA does not pretend to invent privacy. It inherits it. From{" "}
                  <span className="text-foreground">David Chaum</span> and his blind
                  signatures in 1982, to the <span className="text-foreground">Cypherpunks</span> of
                  the 90s who declared that <span className="italic">"privacy is necessary for an open society
                  in the electronic age"</span>. From <span className="text-foreground">Zcash</span> proving
                  that zk-SNARKs could shield value at scale, to{" "}
                  <span className="text-foreground">Monero</span> defending the principle that
                  privacy must be the default, never an option. From{" "}
                  <span className="text-foreground">Tor</span> and <span className="text-foreground">I2P</span> teaching
                  us how to hide the wire itself. Every line of ZOKA is a thank-you note to
                  those who came before, and refused to compromise.
                </>
              ),
            },
            {
              id: "04",
              title: "Optional privacy is no privacy",
              body: (
                <>
                  Any chain that lets you "turn on" private mode for some transactions has
                  already lost. The moment privacy is optional, using it becomes a signal —
                  a flag for any analyst to follow. ZOKA has no shielded mode and no
                  transparent mode. There is one mode. The protocol refuses, at the type
                  level, to broadcast value in cleartext.
                </>
              ),
            },
            {
              id: "05",
              title: "I do not ask you to trust me",
              body: (
                <>
                  I am one developer. I will make mistakes. The whole point of building on
                  zero-knowledge cryptography, MPC ceremonies and open code is so that you
                  do not have to take my word for anything. Verify the proofs. Audit the
                  circuits. Run a node. If ZOKA only works because you trust Natosh Zoka,
                  then ZOKA has already failed. It works because the math holds.
                </>
              ),
            },
            {
              id: "06",
              title: "Honest about what we cannot do",
              body: (
                <>
                  ZOKA will not protect you from a global passive adversary that watches
                  every wire on Earth. It will not save you if you reuse addresses across
                  your real identity. It is not post-quantum today. I will not promise
                  perfection, because perfect privacy is a marketing word, not a
                  cryptographic one. What I promise is the strongest privacy I know how to
                  ship, with the limits written down in plain text — not buried in a
                  footnote.
                </>
              ),
            },
            {
              id: "07",
              title: "No premine. No foundation. No backdoor.",
              body: (
                <>
                  There is no pre-mine, no founder allocation, no <span className="italic">"compliance"</span> view
                  key the protocol can hand over. The only entity that can ever reveal a
                  ZOKA transaction is the user who owns the key. Not me. Not a foundation.
                  Not a regulator. If that scares some people, good. It means the design is
                  doing its job.
                </>
              ),
            },
            {
              id: "08",
              title: "Why I am writing this",
              body: (
                <>
                  Most of what I do happens in silence — circuits, consensus, refactors that
                  nobody will ever read. But once, I owe it to whoever is reading this to
                  state the thing out loud: <span className="text-foreground">privacy is not a crime, it is a civic
                  infrastructure.</span> ZOKA is my contribution to that infrastructure. Use it
                  to pay for things. Use it to receive a salary without your employer
                  knowing the rest of your life. Use it to donate to causes that the next
                  regime might criminalize. Use it for nothing, just to know it exists.
                  <br />
                  <br />
                  That is enough for me.
                </>
              ),
            },
          ].map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-12 gap-4 md:gap-6 py-8 border-b border-border last:border-0"
            >
              <div className="col-span-12 md:col-span-1 font-mono text-xs text-muted-foreground">
                {c.id}
              </div>
              <div className="col-span-12 md:col-span-11 space-y-3">
                <h3 className="text-xl md:text-2xl font-extralight tracking-[-0.01em] text-foreground">
                  {c.title}
                </h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing signature */}
        <div className="pt-6 flex flex-col gap-2">
          <p className="text-base md:text-lg font-light text-foreground italic">
            "Verify what is true. Reveal nothing else."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-foreground">
              — Natosh Zoka
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              core dev @ Zokachain
            </span>
          </div>
        </div>
      </div>
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
    eyebrow: "III. DOCS · TECHNICAL OVERVIEW v1.0",
    title: (
      <>
        A pure-Rust blockchain,<br />
        <span className="text-muted-foreground">privacy by construction.</span>
      </>
    ),
    body: <DocsAccordion />,
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

      <div className="relative h-full overflow-y-auto no-scrollbar">
        <div className="min-h-full flex flex-col justify-start pt-24 pb-24">
          <div className="max-w-5xl mx-auto px-6 md:px-10 w-full">
            <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-10 uppercase animate-fade-in">
              {data.eyebrow}
            </div>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.05] tracking-[-0.03em] mb-12 animate-fade-in">
              {data.title}
            </h2>
            <div className="text-base md:text-lg text-muted-foreground font-light leading-relaxed animate-fade-in">
              {data.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOverlay;
