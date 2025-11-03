"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieAnim({ srcJson, animationData, loop = true, speed = 1 }) {
  const [data, setData] = useState(animationData || null);

  useEffect(() => {
    if (!animationData && srcJson) {
      fetch(srcJson)
        .then((r) => r.json())
        .then(setData)
        .catch(() => setData(null));
    }
  }, [srcJson, animationData]);

  if (!data) return null;

  return (
    <div className="absolute inset-0">
      <Lottie animationData={data} loop={loop} style={{ width: "100%", height: "100%" }} />
      {/* speed: applicalo modulando l'animazione interna */}
      <style jsx global>{`
        .lottie-animation {
          animation-duration: ${1 / (speed || 1)}s !important;
        }
      `}</style>
    </div>
  );
}
