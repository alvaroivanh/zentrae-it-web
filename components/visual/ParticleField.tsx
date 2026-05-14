"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * Lightweight canvas tech-network background. Pure vanilla, no deps.
 * Sized to the parent's bounding rect, respects DPR, throttles to 60fps,
 * pauses when offscreen or when prefers-reduced-motion is set.
 */
export function ParticleField({
  className,
  density = 0.00012,
  linkDistance = 130,
  color = "#7F77DD",
  accent = "#5DCAA5",
}: {
  className?: string;
  density?: number;
  linkDistance?: number;
  color?: string;
  accent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(24, Math.min(110, Math.floor(width * height * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function tick() {
      if (!running || !ctx) {
        raf = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Move particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.35;
            ctx.strokeStyle = `${color}${Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes — every 6th uses accent teal for subtle rhythm
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = i % 6 === 0 ? accent : color;
        ctx.globalAlpha = i % 6 === 0 ? 0.8 : 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, i % 6 === 0 ? 1.6 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause when offscreen
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) running = e.isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    if (!reduced) {
      raf = requestAnimationFrame(tick);
    } else {
      // Render one static frame
      tick();
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [density, linkDistance, color, accent]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
