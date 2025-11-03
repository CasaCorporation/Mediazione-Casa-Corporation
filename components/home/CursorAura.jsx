import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorAura() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xs = useSpring(x, { stiffness: 300, damping: 30, mass: 0.2 });
  const ys = useSpring(y, { stiffness: 300, damping: 30, mass: 0.2 });

  React.useEffect(() => {
    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (isCoarse || reduce) return;

    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[55] h-32 w-32 rounded-full"
      style={{
        translateX: xs,
        translateY: ys,
        background: "radial-gradient(30% 30% at 50% 50%, rgba(212,175,55,0.25), rgba(212,175,55,0) 70%)"
      }}
      aria-hidden="true"
    />
  );
}
