import { useEffect, useRef } from "react";

/**
 * Privacy field — a cryptographic veil.
 *
 * Streams of binary / hex glyphs rain down the canvas, occasionally getting
 * "redacted" by black bars (like a classified document) and re-encrypted with
 * soft propagation rings. Pure monochrome, designed to feel like data being
 * obscured in real time. Intentionally dense so it competes visually with
 * the headline and reinforces the "privacy protocol" idea.
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

    const GLYPHS = "01ABCDEF0123456789∎▮▮□◇◆⌬⎔".split("");
    const FONT_SIZE = 14;
    const COL_W = FONT_SIZE;
    let cols = Math.ceil(width / COL_W);

    type Drop = {
      y: number;
      speed: number;
      head: number;     // brightness of leading glyph
      density: number;  // how often glyphs render
      redactAt: number; // y position where this column gets a redaction bar
      redactLen: number;
      redactPhase: number;
    };

    const makeDrop = (): Drop => ({
      y: Math.random() * -height,
      speed: 0.4 + Math.random() * 1.6,
      head: 0.6 + Math.random() * 0.4,
      density: 0.55 + Math.random() * 0.4,
      redactAt: Math.random() * height,
      redactLen: 30 + Math.random() * 140,
      redactPhase: Math.random() * Math.PI * 2,
    });

    let drops: Drop[] = Array.from({ length: cols }, makeDrop);

    type Ring = { x: number; y: number; r: number; max: number; born: number };
    const rings: Ring[] = [];

    const onResize = () => {
      resize();
      cols = Math.ceil(width / COL_W);
      drops = Array.from({ length: cols }, makeDrop);
    };
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", onResize);

    const getTokens = () => {
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--foreground").trim() || "0 0% 98%";
      const bg = styles.getPropertyValue("--background").trim() || "0 0% 0%";
      return { fg, bg };
    };

    let raf = 0;
    const start = performance.now();
    let lastRing = 0;

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const { fg, bg } = getTokens();

      // Smear previous frame for a phosphor / decay trail
      ctx.fillStyle = `hsl(${bg} / 0.12)`;
      ctx.fillRect(0, 0, width, height);

      // Vignette towards centre so the headline reads cleanly
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.1,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      vignette.addColorStop(0, `hsl(${bg} / 0.35)`);
      vignette.addColorStop(1, `hsl(${bg} / 0)`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Glyph rain
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < cols; i++) {
        const d = drops[i];
        const x = i * COL_W;

        if (Math.random() < d.density) {
          const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          // Trailing glyph (dim)
          ctx.fillStyle = `hsl(${fg} / 0.18)`;
          ctx.fillText(ch, x, d.y);
          // Leading glyph (bright) — emphasises movement
          const headCh = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          ctx.fillStyle = `hsl(${fg} / ${d.head})`;
          ctx.fillText(headCh, x, d.y + FONT_SIZE * 0.2);
        }

        d.y += d.speed * 1.6;
        if (d.y > height + 20) {
          drops[i] = makeDrop();
          drops[i].y = -20;
        }
      }

      // Redaction bars — "censor" random horizontal bands occasionally
      const redactCount = 3;
      for (let i = 0; i < redactCount; i++) {
        const phase = (t * 0.35 + i * 1.7) % 6;
        if (phase < 1.4) {
          const alpha = Math.sin((phase / 1.4) * Math.PI) * 0.85;
          const seed = Math.floor(t * 0.35 + i * 1.7);
          const rand = Math.sin(seed * 999.13) * 0.5 + 0.5;
          const y = rand * height;
          const h = 14 + (Math.sin(seed * 12.7) * 0.5 + 0.5) * 26;
          const x = (Math.sin(seed * 41.3) * 0.5 + 0.5) * width * 0.4;
          const w = width * (0.35 + (Math.sin(seed * 7.1) * 0.5 + 0.5) * 0.55);
          ctx.fillStyle = `hsl(${fg} / ${alpha})`;
          ctx.fillRect(x, y, w, h);
          // Inner cut to look like a redacted block
          ctx.fillStyle = `hsl(${bg} / ${alpha * 0.35})`;
          ctx.fillRect(x + 4, y + 4, Math.max(0, w - 8), Math.max(0, h - 8));
        }
      }

      // Propagation rings — encryption pulses
      if (now - lastRing > 1100) {
        rings.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0,
          max: 200 + Math.random() * 260,
          born: now,
        });
        lastRing = now;
      }
      ctx.lineWidth = 0.6;
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        const life = (now - r.born) / 2200;
        if (life >= 1) {
          rings.splice(i, 1);
          continue;
        }
        r.r = r.max * life;
        const a = (1 - life) * 0.35;
        ctx.strokeStyle = `hsl(${fg} / ${a})`;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
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
