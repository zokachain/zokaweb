const layers = [
  { id: "01", name: "Cryptography", desc: "zk-SNARKs · MPC · Homomorphic encryption" },
  { id: "02", name: "Consensus", desc: "Byzantine fault tolerant · sub-second finality" },
  { id: "03", name: "Execution", desc: "Shielded virtual machine · private state" },
  { id: "04", name: "Application", desc: "Encrypted by default · selective disclosure" },
];

const Protocol = () => (
  <section className="relative py-48 md:py-64">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="font-mono text-[11px] tracking-[0.4em] text-muted-foreground mb-16 reveal">
        III. PROTOCOL
      </div>

      <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.05] tracking-[-0.03em] mb-24 reveal max-w-4xl">
        Four layers,<br />
        <span className="text-muted-foreground">one private state machine.</span>
      </h2>

      <div className="border-t border-border">
        {layers.map((l) => (
          <div
            key={l.id}
            className="grid md:grid-cols-12 gap-6 py-10 md:py-14 border-b border-border reveal group hover:bg-card/30 transition-colors duration-500 px-2"
          >
            <div className="md:col-span-1 font-mono text-xs text-muted-foreground">{l.id}</div>
            <div className="md:col-span-4 text-2xl md:text-3xl font-light tracking-tight group-hover:text-gradient transition-all">
              {l.name}
            </div>
            <div className="md:col-span-6 md:col-start-7 text-muted-foreground font-light">
              {l.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default Protocol;
