import { useEffect, useRef } from "react";

export default function JellySphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width = 200;
    const h = canvas.height = 200;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 70;
    const points = 32;
    const jelly = Array(points).fill(0).map((_, i) => ({
      angle: (i / points) * Math.PI * 2,
      base: radius,
      offset: 0,
      speed: Math.random() * 0.05 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const p = jelly[i];
        const next = jelly[(i + 1) % points];
        const r = p.base + p.offset;
        const x = Math.cos(p.angle) * r;
        const y = Math.sin(p.angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.quadraticCurveTo(x, y, Math.cos(next.angle) * (next.base + next.offset), Math.sin(next.angle) * (next.base + next.offset));
      }
      ctx.closePath();
      ctx.fillStyle = "#a855f7";
      ctx.shadowColor = "#a855f7";
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      for (let i = 0; i < points; i++) {
        const p = jelly[i];
        p.offset = Math.sin(Date.now() * p.speed / 2 + p.phase) * 12;
      }
      draw();
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <canvas ref={canvasRef} width={200} height={200} style={{ borderRadius: "50%", background: "transparent" }} />
    </div>
  );
}
