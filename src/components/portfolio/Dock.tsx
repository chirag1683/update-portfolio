import { motion } from "framer-motion";
import { Home, User, Sparkles, Briefcase, GraduationCap, FileText, Award, Mail } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "experience", label: "Experience", icon: GraduationCap },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "certificates", label: "Certs", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Dock({ active }: { active: string }) {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="glass flex items-center gap-1 rounded-2xl px-2 py-2 md:gap-2 md:px-3">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              data-cursor-hover
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-white/70 transition hover:scale-110 hover:text-white md:h-11 md:w-11"
            >
              <Icon size={18} className="relative z-10" />
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 ring-1 ring-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] uppercase tracking-wider opacity-0 transition group-hover:opacity-100">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}