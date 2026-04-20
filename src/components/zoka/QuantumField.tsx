import { useEffect, useRef } from "react";

/**
 * Quantum / privacy field — monochrome.
 * Probability cloud of particles that periodically "collapse" into
 * wave interference rings, then disperse again. No colour.
 */
const QuantumField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 220;
    type P = { x: number; y: number; angle: number; radius: number; speed: number; phase: number; size: number };
    const particles: P[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      angle: Math.random() * Math.PI * 2,
      radius: 80 + Math.random() * 320,
      speed: 0.0005 + Math.random() * 0.0015,
      phase: Math.random() * Math.PI * 2,
      size: 0.4 + Math.random() * 1.2,
    }));

    // Read theme tokens from CSS so the animation adapts to dark/light.
    // Use modern hsl(H S L / A) syntax which supports space-separated values.
    const getTokens = () => {
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--foreground").trim() || "0 0% 98%";
      const bg = styles.getPropertyValue("--background").trim() || "0 0% 0%";
      return { fg, bg };
    };

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const cx = width / 2;
      const cy = height / 2;
      const { fg, bg } = getTokens();

      // Trail effect using the page background.
      ctx.fillStyle = `hsl(${bg} / 0.18)`;
      ctx.fillRect(0, 0, width, height);

      // Quantum collapse cycle — every ~6s.
      const cycle = (t % 6) / 6;
      const collapse = Math.pow(Math.sin(cycle * Math.PI), 6);

      // Concentric interference rings (probability waves)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const r = ((t * 30 + i * 90) % 500) + 20;
        const alpha = (1 - r / 520) * 0.15 * (1 - collapse * 0.5);
        ctx.strokeStyle = `hsl(${fg} / ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Particles orbiting the centre with quantum jitter
      for (const p of particles) {
        p.angle += p.speed;
        const jitter = Math.sin(t * 2 + p.phase) * 12;
        const r = p.radius * (1 - collapse * 0.55) + jitter;
        p.x = cx + Math.cos(p.angle) * r;
        p.y = cy + Math.sin(p.angle) * r * 0.55;

        const a = 0.35 + Math.sin(t * 1.5 + p.phase) * 0.25 + collapse * 0.4;
        ctx.fillStyle = `hsl(${fg} / ${Math.max(0.05, a)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + collapse * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default QuantumField;
