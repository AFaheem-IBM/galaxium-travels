import { useEffect, useRef } from 'react';

/** Renders an animated particle background evoking a dark concert venue with floating light orbs. */
export const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Floating stage-light bokeh particles
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      phase: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(229,57,53,',   // red
      'rgba(255,112,67,',  // orange
      'rgba(255,179,0,',   // amber
      'rgba(255,255,255,', // white
    ];

    const numParticles = 160;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.phase += p.speed;
        const pulse = Math.sin(p.phase) * 0.4 + 0.6;
        const alpha = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        // Slow upward drift — like cigarette smoke / stage haze
        p.y -= 0.15;
        if (p.y < -p.radius) {
          p.y = canvas.height + p.radius;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(to bottom, #0D0D0D, #1a0a0a)' }}
    />
  );
};

// Made with Bob
