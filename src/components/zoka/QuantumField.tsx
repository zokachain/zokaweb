import { useEffect, useRef } from "react";

/**
 * Quantum / privacy field — monochrome.
 * Renders a probability cloud of particles that periodically "collapse"
 * (encrypt) into wave interference rings, then disperse again. No colour.
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

    // Read foreground colour from CSS so it adapts to light/dark themes.
    const getFg = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim();
      return v || "0 0% 98%";
    };

    let raf = 0;
    let start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const cx = width / 2;
      const cy = height / 2;
      const fg = getFg();

      // Trail effect — paint a translucent background rectangle.
      // Use the actual page background so it works in both themes.
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--background").trim() || "0 0% 0%";
      ctx.fillStyle = `hsla(${bg}, 0.18)`;
      ctx.fillRect(0, 0, width, height);

      // Quantum collapse cycle — every ~6s, particles contract toward centre.
      const cycle = (t % 6) / 6; // 0..1
      const collapse = Math.pow(Math.sin(cycle * Math.PI), 6); // sharp pulse near middle of cycle

      // Concentric interference rings (probability waves)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const r = ((t * 30 + i * 90) % 500) + 20;
        const alpha = (1 - r / 520) * 0.12 * (1 - collapse * 0.5);
        ctx.strokeStyle = `hsla(${fg}, ${alpha})`;
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
        p.y = cy + Math.sin(p.angle) * r * 0.55; // ellipse

        const a = 0.35 + Math.sin(t * 1.5 + p.phase) * 0.25 + collapse * 0.4;
        ctx.fillStyle = `hsla(${fg}, ${Math.max(0.05, a)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + collapse * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Faint vertical scan line — like a measurement passing through
      const scanX = ((t * 80) % (width + 200)) - 100;
      const grad = ctx.createLinearGradient(scanX - 60, 0, scanX + 60, 0);
      grad.addColorStop(0, `hsla(${fg}, 0)`);
      grad.addColorStop(0.5, `hsla(${fg}, 0.06)`);
      grad.addColorStop(1, `hsla(${fg}, 0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 60, 0, 120, height);

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
