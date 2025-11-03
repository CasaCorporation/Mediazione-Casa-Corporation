"use client";

// SAFE PageTransition: se framer-motion non c'è o qualcosa va storto → ritorna i children.
export default function PageTransition({ children }) {
  // fallback immediato (nessuna animazione) per evitare schermate vuote
  let AnimatePresence, motion, useRouter;
  try {
    ({ AnimatePresence, motion } = require("framer-motion"));
    useRouter = require("next/router").useRouter;
  } catch {
    return children ?? null;
  }

  const router = useRouter?.();
  if (!AnimatePresence || !motion || !router) return children ?? null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
