'use client';

import { useEffect, useRef } from 'react';

export default function FakeSpectrumVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrameId = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numBars = 72;
    const spacing = 2;
    const cornerRadius = 3;

    const colors = [
      'rgba(139, 92, 246, 0.55)',  // violet-500
      'rgba(56, 189, 248, 0.55)',  // sky-400
      'rgba(244, 114, 182, 0.55)', // pink-400
      'rgba(52, 211, 153, 0.55)',  // emerald-400
      'rgba(251, 191, 36, 0.55)',  // amber-400
    ];

    let spectrum = new Array(numBars).fill(0);
    let target = new Array(numBars).fill(0);

    const drawRoundedRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      fillStyle: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / numBars;
      const scaledCornerRadius = cornerRadius * pixelRatio;

      ctx.clearRect(0, 0, width, height);

      const maxHeight = height * 0.75;

      for (let i = 0; i < numBars; i++) {
        spectrum[i] += (target[i] - spectrum[i]) * 0.08;
        const barHeight = (spectrum[i] / 100) * maxHeight;

        if (barHeight > 0) {
          const x = i * barWidth + spacing;
          const y = height - barHeight;
          const color = colors[i % colors.length];

          drawRoundedRect(
            ctx, 
            x, 
            y, 
            barWidth - spacing * 2, 
            barHeight - spacing, 
            scaledCornerRadius,
            color
          );
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const generateNewTargets = () => {
      for (let i = 0; i < numBars; i++) {
        const baseAmplitude = 35 + Math.random() * 35;
        const wave1 = Math.sin(i / (numBars / 8)) * 20;
        const wave2 = Math.cos(i / (numBars / 12)) * 15;
        const randomness = Math.random() * 18;

        target[i] = Math.max(0, Math.min(100, baseAmplitude + wave1 + wave2 + randomness));
      }
    };

    draw();
    generateNewTargets();

    const targetInterval = setInterval(generateNewTargets, 1800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(targetInterval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-transparent"
    />
  );
}
