import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  Send,
  Music2,
  VolumeX,
  Sun,
  Moon,
  MapPin,
  Code2,
  Rocket,
  Database,
  Cpu,
  Globe,
  Layers,
  Sparkles,
  ArrowDown,
  Trophy,
  Download,
  Maximize2,
  X,
  FileText,
  Briefcase,
  GraduationCap,
  Award as AwardIcon,
} from "lucide-react";
import { CustomCursor } from "../components/portfolio/CustomCursor";
import { ParticleField } from "../components/portfolio/ParticleField";
import { Loader } from "../components/portfolio/Loader";
import { Dock } from "../components/portfolio/Dock";
import { TiltCard } from "../components/portfolio/TiltCard";

export const Route = createFileRoute("/")({
  component: Index,
});

// ===== Data =====
const ROLES = ["Data Analysis", "Python Developer", "AI Builder", "Hackathon Winner"];

const SKILLS = [
  { name: "PYTHON", level: 95, icon: Code2 },
  { name: "SQL", level: 90, icon: Layers },
  { name: "MYSQL", level: 88, icon: Cpu },
  { name: "JAVA", level: 95, icon: Sparkles },
  { name: "HTML", level: 85, icon: Database },
  { name: "AI", level: 82, icon: Rocket },
  { name: "POWER BI", level: 70, icon: Globe },
  { name: "MACHINE LEARNING", level: 88, icon: Sparkles },
  { name: "DATA VISULIAZATION", level: 88, icon: Sparkles },
];

const TECH_TICKER = [
 "Python",
"SQL",
"Excel",
"Power BI",
"Tableau",
"Pandas",
"NumPy",
"Matplotlib",
"Seaborn",
"Machine Learning",
"Data Visualization",
"Statistics",
"MySQL",
"MongoDB",
"Jupyter Notebook",
"Scikit-learn",
"Data Cleaning",
"Business Intelligence",
];

const PROJECTS = [
  {
     title: "Rotate With Human Hand",
  tag: "AI · Computer Vision",
  description:
    "A hand gesture-based project that enables object rotation and interaction using real-time human hand tracking.",
  tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
  accent: "from-cyan-500 via-blue-500 to-indigo-500",
  demo: "#",
  code: "https://github.com/chirag1683/rotate-with-human-hand"
  },
  {
    title: "Utility Toolkit",
    tag: "Productivity",
    description:
      "A blazing-fast suite of 30+ everyday developer & creator utilities — converters, formatters, generators in one PWA.",
    tech: ["HTML", "CSS", "Javascript", "OPENAI"],
    accent: "from-cyan-400 via-sky-500 to-blue-600",
    demo: "#",
    code: "https://github.com/chirag1683/Chirag-Utility-toolkit",
  },
  {
    title: "Hospital Management System",
    tag: "Enterprise",
    description:
      "End-to-end HMS with role-based dashboards for doctors, patients & admins, real-time appointments and billing.",
    tech: ["MERN", "Socket.io", "JWT", "Stripe"],
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    demo: "#",
    code: "#",
  },
  {
    title: "CareTrack+",
    tag: "HealthTech",
    description:
      "Patient care tracking app with smart reminders, vitals visualization and caregiver collaboration in real-time.",
    tech: ["React Native", "Firebase", "Recharts"],
    accent: "from-rose-400 via-pink-500 to-fuchsia-600",
    demo: "#",
    code: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Data Analysis Intern",
    org: "Beacon Hives Private Limited",
    period: "2026 — Present",
    points: [
      "Built analytics dashboards with Power BI",
"Analyzed datasets using Python and SQL",
"Created data visualization projects"
    ],
  },
  {
    role: "Web Developer Intern",
    org: "Digital Dynamoix",
    period: "2025",
    points: [
      "Built responsive web interfaces",
"Worked on frontend development tasks",
"Collaborated on live web projects"
    ],
  },
  {
    role: "Hackathon Winner ",
    org: "PIET",
    period: "2026",
    points: [
      "Led a team of 4 to build a winning healthcare solution",
      "Awarded among top 1 of 50 teams",
    ],
  },
  {
    role: "Google Cloud Contributer",
    org: "Google",
    period: "2025-2026",
    points: ["Contributed to Google Cloud projects",
"Worked on cloud and web solutions",
"Collaborated in open-source programs"],
  },
];

const CERTIFICATES = [
  "Google Cloud Data Analysis Certificate",
  "Generative Ai NPTEL Certificate",
  "IBM Data Analysis Certificate",
  "Istart Rajasthan Ai Certificate",
  "Linkedin Generative Ai Certificate",
  "Microsoft Buisness Analysis with Excel",
  "IBM Machine Learning For Data Science",
  "SimpleLearn Machine Learning Certificate",
];

const STATS = [
  { value: 40, suffix: "+", label: "Projects Shipped" },
  { value: 12, suffix: "+", label: "Awards & Wins" },
  { value: 3, suffix: "yrs", label: "Coding Experience" },
  { value: 99, suffix: "%", label: "Pixel-Perfect" },
];

// ===== Helpers =====
function useTyping(words: string[], speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDel(true), pause);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next.length === 0) {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? 35 : speed
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(168,85,247,0.10), transparent 40%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[1]" />;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

// ===== Page =====
function Index() {
  const [ready, setReady] = useState(false);
  const [mute, setMute] = useState(true);
  const [light, setLight] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const role = useTyping(ROLES);
  const active = useActiveSection([
    "home", "about", "skills", "projects", "experience", "resume", "certificates", "contact",
  ]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("portfolio-light") : null;
    if (saved === "1") setLight(true);
    const t = setTimeout(() => setReady(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light-mode", light);
    document.documentElement.style.setProperty(
      "background",
      light ? "#f5f6ff" : "#05060f"
    );
    localStorage.setItem("portfolio-light", light ? "1" : "0");
  }, [light]);

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (mute) {
      a.volume = 0.25;
      a.play().catch(() => {});
      setMute(false);
    } else {
      a.pause();
      setMute(true);
    }
  };

  return (
    <div className={light ? "relative min-h-screen text-slate-900" : "relative min-h-screen text-white"}>
      <Loader done={ready} />
      <CustomCursor />
      <Spotlight />

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500"
      />

      {/* Floating controls */}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        <button
          aria-label="Toggle theme"
          data-cursor-hover
          onClick={() => setLight((v) => !v)}
          className="glass flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110"
        >
          {light ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button
          aria-label="Toggle music"
          data-cursor-hover
          onClick={toggleMusic}
          className="glass flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110"
        >
          {mute ? <VolumeX size={16} /> : <Music2 size={16} />}
        </button>
        <audio
          ref={audioRef}
          loop
          src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_347111d654.mp3?filename=cyberpunk-126149.mp3"
        />
      </div>

      <Dock active={active} />

      {/* HERO */}
      <section
        id="home"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
      >
        <div className="absolute inset-0 bg-grid" />
        <ParticleField />
        {/* Blobs */}
        <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/30 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-blob" style={{ animationDelay: "-10s" }} />

        {/* Anime floating sakura orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[
            { l: "12%", t: "22%", s: 10, c: "from-pink-300 to-fuchsia-400", d: "0s" },
            { l: "82%", t: "30%", s: 8, c: "from-cyan-300 to-sky-400", d: "-2s" },
            { l: "68%", t: "70%", s: 14, c: "from-violet-300 to-fuchsia-400", d: "-4s" },
            { l: "22%", t: "75%", s: 6, c: "from-rose-300 to-pink-400", d: "-6s" },
            { l: "50%", t: "18%", s: 5, c: "from-cyan-200 to-blue-300", d: "-3s" },
            { l: "90%", t: "60%", s: 9, c: "from-purple-300 to-indigo-400", d: "-5s" },
          ].map((o, i) => (
            <div
              key={i}
              className={`float-orb absolute rounded-full bg-gradient-to-br ${o.c} blur-[1px]`}
              style={{
                left: o.l,
                top: o.t,
                width: o.s,
                height: o.s,
                animationDelay: o.d,
                boxShadow: "0 0 24px currentColor",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl lg:text-[8.5rem]"
          >
            <span className="block text-white/80 text-2xl md:text-3xl font-medium mb-3 tracking-tight">Hi, I'm</span>
            <span className="halo holo-text">Chirag Gupta</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-5 text-lg md:text-2xl"
          >
            <span className="text-white/60">I build </span>
            <span className="font-semibold text-white">{role}</span>
            <span className="ml-0.5 inline-block h-6 w-[2px] translate-y-1 animate-pulse bg-cyan-300" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base text-white/60 md:text-lg"
          >
            Turning complex data into clear insights using analytics, visualization, and modern data tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              data-cursor-hover
              className="group shine relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] transition hover:shadow-[0_0_50px_rgba(168,85,247,0.9)]"
            >
              <span className="relative z-10">View My Work</span>
            </a>
            <a
              href="#contact"
              data-cursor-hover
              className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold backdrop-blur transition hover:border-white/40 hover:bg-white/10"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 text-white/40"
        >
          <ArrowDown size={22} />
        </motion.a>
      </section>

      {/* TECH TICKER */}
      <div className="relative z-10 border-y border-white/10 bg-black/40 py-5 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 gap-12 whitespace-nowrap px-6 text-sm uppercase tracking-[0.3em] text-white/40">
            {[...TECH_TICKER, ...TECH_TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-cyan-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" eyebrow="01 · About" title="The developer behind the pixels">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 text-white/70">
            <p className="text-lg leading-relaxed">
              I'm <span className="text-white">Chirag Gupta</span>, I'm Chirag Gupta, a passionate Data Analyst focused on transforming raw data into meaningful insights and impactful decisions. I enjoy working with analytics, visualization, and intelligent data-driven solutions that solve real-world problems.

            </p>
            <p className="leading-relaxed">
          From hackathons to analytical projects, I've worked on dashboards, business insights, and data-focused applications across healthcare, education, and productivity domains — always exploring smarter ways to turn data into value.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <MapPin size={14} /> India · Open to global remote
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold neon-text">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="gradient-border glass aspect-square overflow-hidden rounded-3xl p-6">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/30 via-purple-500/20 to-cyan-500/30">
                <div className="text-center">
                  <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-5xl font-extrabold text-white shadow-[0_0_60px_rgba(168,85,247,0.6)]">
                    CG
                  </div>
                  <div className="mt-4 text-sm uppercase tracking-[0.3em] text-white/70">
                    Chirag Gupta
                  </div>
                  <div className="text-xs text-white/40">Developer · Creator</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 blur-2xl" />
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="02 · Skills" title="Tools of the trade">
        <div className="grid gap-4 md:grid-cols-2">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="glass rounded-2xl p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300">
                    <s.icon size={16} />
                  </div>
                  <span className="font-semibold">{s.name}</span>
                </div>
                <span className="text-xs text-white/50">{s.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="03 · Projects" title="Featured work">
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <TiltCard className="gradient-border glass h-full rounded-2xl p-6">
                <div className={`relative mb-5 h-48 overflow-hidden rounded-xl bg-gradient-to-br ${p.accent}`}>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    {p.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
                    {p.tag}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-white/60">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href={p.demo}
                    data-cursor-hover
                    className="shine relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a
                    href={p.code}
                    data-cursor-hover
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:border-white/40"
                  >
                    <Github size={14} /> Code
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE TIMELINE */}
      <Section id="experience" eyebrow="04 · Journey" title="Experience timeline">
        <div className="relative mx-auto max-w-3xl pl-6 md:pl-0">
          <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-fuchsia-500/60 to-pink-500/60 md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-10">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative md:grid md:grid-cols-2 md:gap-10 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div
                  className={`absolute -left-[19px] top-2 h-3 w-3 rounded-full bg-cyan-300 ring-4 ring-cyan-400/20 md:left-1/2 md:-translate-x-1/2`}
                  style={{ boxShadow: "0 0 16px rgba(34,211,238,0.9)" }}
                />
                <div className={i % 2 === 0 ? "md:text-right md:pr-10" : "md:pl-10"}>
                  <div className="glass rounded-2xl p-5">
                    <div className="text-xs uppercase tracking-widest text-cyan-300">{e.period}</div>
                    <h3 className="mt-1 text-lg font-bold">{e.role}</h3>
                    <div className="text-sm text-white/60">{e.org}</div>
                    <ul className="mt-3 space-y-1 text-sm text-white/70">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* RESUME */}
      <ResumeSection />

      {/* CERTIFICATES */}
      <Section id="certificates" eyebrow="06 · Recognition" title="Certificates & wins">
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#05060f] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#05060f] to-transparent" />
          <div className="flex w-max marquee-track gap-5">
            {[...CERTIFICATES, ...CERTIFICATES].map((c, i) => (
              <div
                key={i}
                className="glass group relative w-72 shrink-0 rounded-2xl p-6 transition hover:scale-[1.03]"
              >
                <Trophy className="text-amber-300" size={20} />
                <div className="mt-3 text-sm uppercase tracking-widest text-white/40">Certificate</div>
                <div className="mt-1 text-lg font-semibold leading-snug">{c}</div>
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-1/2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="07 · Contact" title="Let's build something legendary">
        <ContactForm />
      </Section>

      {/* FOOTER */}
      <footer className="relative mt-10 border-t border-white/10 px-6 py-10 text-center">
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 text-2xl font-extrabold neon-text">CHIRAG GUPTA</div>
          <div className="flex justify-center gap-3">
            {[
              { icon: Github, href: "https://github.com/chirag1683" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/chirag-gupta-558bb3326/" },
              { icon: Twitter, href: "https://x.com/ChiragGupt34792" },
              { icon: Mail, href: "workwithchirag09@gmail.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                data-cursor-hover
                className="glass flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110 hover:text-cyan-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="mt-6 text-xs text-white/40">
            © {new Date().getFullYear()} Chirag Gupta · Designed & built with cinematic care.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===== Reusable Section =====
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">{eyebrow}</div>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            <span className="neon-text">{title}</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// ===== Contact Form =====
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 900);
  };

  return (
    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_1.2fr]">
      <div className="space-y-4">
        <p className="text-white/70">
          Have a project, role or idea in mind? Drop a message — I usually reply within a day.
        </p>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-cyan-300" />
            <a href="mailto:workwithchirag09@gmail.com" data-cursor-hover className="hover:text-cyan-300">
            workwithchirag09@gmail.com
            </a>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 text-sm">
            <MapPin size={16} className="text-fuchsia-300" />
            India · Open to remote worldwide
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="glass gradient-border space-y-4 rounded-2xl p-6">
        <Field label="Name">
          <input
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            placeholder="you@domain.com"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-fuchsia-400/60 focus:shadow-[0_0_20px_rgba(168,85,247,0.25)]"
          />
        </Field>
        <Field label="Message">
          <textarea
            required
            rows={4}
            placeholder="Tell me about your project..."
            className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-pink-400/60 focus:shadow-[0_0_20px_rgba(236,72,153,0.25)]"
          />
        </Field>
        <button
          type="submit"
          disabled={sending}
          data-cursor-hover
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] transition hover:shadow-[0_0_40px_rgba(168,85,247,0.9)] disabled:opacity-60"
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="sent"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex items-center gap-2"
              >
                ✓ Message Sent
              </motion.span>
            ) : sending ? (
              <motion.span
                key="sending"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                Sending…
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Send size={14} /> Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs uppercase tracking-widest text-white/50">{label}</div>
      {children}
    </label>
  );
}

// silence unused-import warnings for icons that may be tree-shaken
void useTransform;

// ===== Resume Section =====
const RESUME_URL = "/Chirag-Gupta-Resume.pdf";

const RESUME_STATS = [
  { icon: Briefcase, value: 15, suffix: "+", label: "Projects" },
  { icon: AwardIcon, value: 12, suffix: "+", label: "Awards" },
  { icon: GraduationCap, value: 9.5, suffix: "/10", label: "GPA", decimal: true },
  { icon: Code2, value: 25, suffix: "+", label: "Technologies" },
];

const RESUME_HIGHLIGHTS = {
  skills: ["Python, SQL, Power BI, Tableau, Excel, Pandas, NumPy, Matplotlib, Seaborn, Machine Learning"],
  experience: [
    "Data Analyst Intern· 10k+ users served",
    "Google Cloud Contributor · 500+ stars across libraries",
    "PIET Hackathon · Top 1 of 50 teams",
  ],
  certs: ["Google Data Analytics", "Python for Data Science", "IBM Machine Learning", "Python Developer"],
};

function DecimalCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Number((to * eased).toFixed(1)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function ResumeSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Section id="resume" eyebrow="05 · Resume" title="Built for Data Analysts">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="gradient-border glass relative overflow-hidden rounded-2xl p-3"
          >
            <div className="relative aspect-[8.5/11] w-full overflow-hidden rounded-xl bg-white/95 shadow-[0_0_60px_rgba(168,85,247,0.35)]">
              <object
                data={`${RESUME_URL}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                type="application/pdf"
                className="h-full w-full"
                aria-label="Chirag Gupta resume preview"
              >
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-600">
                  Preview unavailable. Use the Download or Fullscreen buttons below.
                </div>
              </object>
              {/* Hover overlay */}
              <button
                onClick={() => setOpen(true)}
                data-cursor-hover
                className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition hover:opacity-100"
                aria-label="Open resume fullscreen"
              >
                <span className="translate-y-4 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-xl transition group-hover:translate-y-0">
                  <Maximize2 size={14} className="mr-2 inline" /> View Fullscreen
                </span>
              </button>
            </div>
            {/* Floating chip */}
            <div className="pointer-events-none absolute right-5 top-5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">
              PDF · 1 page
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {RESUME_STATS.map((s) => (
                <div key={s.label} className="glass group relative overflow-hidden rounded-xl p-4 transition hover:scale-[1.02]">
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-fuchsia-500/10 blur-2xl transition group-hover:bg-fuchsia-500/25" />
                  <div className="flex items-center justify-between">
                    <s.icon size={16} className="text-cyan-300" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold neon-text">
                    {s.decimal ? (
                      <DecimalCounter to={s.value} suffix={s.suffix} />
                    ) : (
                      <Counter to={s.value} suffix={s.suffix} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="glass rounded-2xl p-5">
              <HighlightRow label="Top skills" items={RESUME_HIGHLIGHTS.skills} />
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <HighlightRow label="Experience" items={RESUME_HIGHLIGHTS.experience} stack />
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <HighlightRow label="Certifications" items={RESUME_HIGHLIGHTS.certs} />
            </div>

            {/* CTA */}
            <div className="gradient-border glass rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 text-cyan-200">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Interested in working together?</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Download my resume or connect with me — let's build something legendary.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={RESUME_URL}
                  download="Chirag-Gupta-Resume.pdf"
                  data-cursor-hover
                  className="shine relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] transition hover:shadow-[0_0_50px_rgba(168,85,247,0.9)]"
                >
                  <Download size={15} /> Download Resume
                </a>
                <button
                  onClick={() => setOpen(true)}
                  data-cursor-hover
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:border-white/40 hover:bg-white/10"
                >
                  <Maximize2 size={15} /> View Fullscreen
                </button>
                <a
                  href="#contact"
                  data-cursor-hover
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
                >
                  <Mail size={13} /> Or connect with me
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md md:p-8"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="gradient-border relative h-full max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_0_80px_rgba(168,85,247,0.5)]"
            >
              <iframe
                src={`${RESUME_URL}#toolbar=1&view=FitH`}
                title="Chirag Gupta resume — fullscreen"
                className="h-full w-full"
              />
              <button
                onClick={() => setOpen(false)}
                data-cursor-hover
                aria-label="Close"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:scale-110 hover:bg-black"
              >
                <X size={16} />
              </button>
              <a
                href={RESUME_URL}
                download="Chirag-Gupta-Resume.pdf"
                data-cursor-hover
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.6)]"
              >
                <Download size={13} /> Download
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HighlightRow({ label, items, stack = false }: { label: string; items: string[]; stack?: boolean }) {
  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">{label}</div>
      {stack ? (
        <ul className="space-y-1.5 text-sm text-white/75">
          {items.map((it) => (
            <li key={it} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" />
              {it}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((it) => (
            <span key={it} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
              {it}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
