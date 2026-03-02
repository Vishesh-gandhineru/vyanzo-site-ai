"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "framer-motion";

export default function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  const phi = useSpring(0, {
    stiffness: 280,
    damping: 40,
    mass: 1,
  });

  useEffect(() => {
    let currentPhi = 0;
    
    // Convert hex to rgb for cobe
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b] as [number, number, number];
    };

    const baseMarkers = [
      { location: [50.8503, 4.3517] as [number, number], size: 0.08 }, // Belgium
      { location: [48.8566, 2.3522] as [number, number], size: 0.08 }, // France
      { location: [40.4168, -3.7038] as [number, number], size: 0.08 }, // Spain
      { location: [41.9028, 12.4964] as [number, number], size: 0.08 }, // Italy
      { location: [48.2082, 16.3738] as [number, number], size: 0.08 }, // Austria
      { location: [52.3676, 4.9041] as [number, number], size: 0.08 },  // Holland
      { location: [51.5074, -0.1278] as [number, number], size: 0.08 }, // UK
      { location: [40.7128, -74.0060] as [number, number], size: 0.08 },// USA (NY)
      { location: [43.6532, -79.3832] as [number, number], size: 0.08 },// Canada (Toronto)
      { location: [20.5937, 78.9629] as [number, number], size: 0.08 }, // India
      { location: [38.9637, 35.2433] as [number, number], size: 0.08 }, // Turkey
      { location: [14.0583, 108.2772] as [number, number], size: 0.08 }, // Vietnam
    ];

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.95, 0.95, 0.95],
      markerColor: hexToRgb("#6eb0ff"), // Brand primary blue
      glowColor: [0.9, 0.9, 0.9],
      markers: baseMarkers,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          currentPhi += 0.003;
        }
        state.phi = currentPhi + phi.get();
        if (canvasRef.current) {
          state.width = canvasRef.current.clientWidth * 2;
          state.height = canvasRef.current.clientHeight * 2;
        }
        
        // Dynamic blinking/pulsing effect for markers
        const t = Date.now() / 200;
        state.markers = baseMarkers.map(m => ({
          location: m.location,
          size: m.size + Math.sin(t) * 0.03
        }));
      }
    });

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current =
        e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    };

    const onPointerOut = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta;
        phi.set(delta / 200);
      }
    };

    const canvas = canvasRef.current!;
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerout", onPointerOut);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerout", onPointerOut);
      canvas.removeEventListener("pointermove", onPointerMove);
      globe.destroy();
    };
  }, [phi]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain cursor-grab touch-none"
        style={{ width: "100%", height: "100%", maxWidth: "600px", aspectRatio: 1 }}
      />
    </div>
  );
}
