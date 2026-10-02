"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    let dispose;
    import("@/lib/universe.js")
      .then(({ startUniverse }) => {
        if (cancelled || !canvasRef.current) return;
        const hero = document.querySelector(".hero");
        const slots = [...document.querySelectorAll("[data-particle-project]")];
        if (hero && slots.length)
          dispose = startUniverse(canvasRef.current, hero, slots);
      })
      .catch((error) => {
        if (cancelled) return;
        document.body.classList.add("background-unavailable");
        console.warn("Portfolio particles unavailable:", error);
      });
    return () => {
      cancelled = true;
      dispose?.();
      document.body.classList.remove(
        "particles-ready",
        "background-unavailable",
      );
    };
  }, []);
  return (
    <div className="particle-field" aria-hidden="true">
      <canvas ref={canvasRef} id="universe-canvas" />
    </div>
  );
}
