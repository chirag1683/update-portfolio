import { motion } from "framer-motion";

export function Loader({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ pointerEvents: done ? "none" : "auto" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#05060f]"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] text-cyan-300/80"
        >
          Initializing
        </motion.div>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-7xl">
          {"CHIRAG GUPTA".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: "easeOut" }}
              className="inline-block neon-text"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h1>
        <div className="mx-auto mt-8 h-px w-64 overflow-hidden bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: done ? "100%" : "0%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="h-full w-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-400"
          />
        </div>
        <div className="mt-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
          Loading experience
        </div>
      </div>
    </motion.div>
  );
}