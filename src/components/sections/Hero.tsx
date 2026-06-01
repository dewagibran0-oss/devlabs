'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
  type Transition,
} from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Rocket,
  Trophy,
  Zap,
  Star,
  Globe,
  Smartphone,
  Heart,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Easing — typed as const tuple so TS accepts it as Framer Motion's BezierDefinition
// ─────────────────────────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface ServiceCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  price: string;
  badge: string;
  glowRgb: string;           // "244,63,94"  — no alpha, used to build rgba()
  delay: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

interface StatChip {
  icon: React.ReactNode;
  value: string;
  label: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────
const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 1,
    icon: <Heart size={16} />,
    title: 'Wedding & Birthday Website',
    price: 'Rp299.000',
    badge: 'Available Now',
    glowRgb: '244,63,94',
    delay: 0,
    position: { top: '12px', left: '-16px' },
  },
  {
    id: 2,
    icon: <Globe size={16} />,
    title: 'Modern Website & Landing Page',
    price: 'Rp1.999.000',
    badge: '⭐ Most Popular',
    glowRgb: '59,130,246',
    delay: 0.15,
    position: { top: '48%', right: '-22px' },
  },
  {
    id: 3,
    icon: <Smartphone size={16} />,
    title: 'Custom Web & Mobile App',
    price: 'Rp4.999.000',
    badge: 'Enterprise',
    glowRgb: '139,92,246',
    delay: 0.3,
    position: { bottom: '14px', left: '24px' },
  },
];

const STAT_CHIPS: StatChip[] = [
  {
    icon: <TrendingUp size={11} />,
    value: '98%',
    label: 'Satisfaction',
    position: { top: '6px', right: '52px' },
    delay: 0.55,
  },
  {
    icon: <Clock size={11} />,
    value: '7 Days',
    label: 'Avg. Delivery',
    position: { bottom: '56px', right: '8px' },
    delay: 0.75,
  },
];

const TRUST_ITEMS = [
  { icon: <Star size={12} fill="currentColor" />, text: '4.9/5 Client Rating',           color: '#f59e0b' },
  { icon: <Rocket size={12} />,                  text: '150+ Projects Delivered',        color: '#60a5fa' },
  { icon: <Trophy size={12} />,                  text: 'Trusted by Businesses',          color: '#a78bfa' },
  { icon: <Zap size={12} />,                     text: 'Fast Development Process',       color: '#34d399' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Animation variants — typed correctly
// ─────────────────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_OUT_EXPO,
    } as Transition,
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' } as Transition,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function rgba(rgb: string, alpha: number) {
  return `rgba(${rgb},${alpha})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// GlowOrb
// ─────────────────────────────────────────────────────────────────────────────
function GlowOrb({
  className,
  size = 400,
  color,
  delay = 0,
}: {
  className?: string;
  size?: number;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        filter: 'blur(90px)',
      }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay } as Transition}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FloatingServiceCard
// ─────────────────────────────────────────────────────────────────────────────
function FloatingServiceCard({ card, index }: { card: ServiceCard; index: number }) {
  const floatTransition: Transition = {
    duration: 5 + index * 0.9,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: index * 1.3,
  };

  return (
    <motion.div
      className="absolute z-20 select-none"
      style={card.position}
      initial={{ opacity: 0, y: 24, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.85 + card.delay, duration: 0.65, ease: EASE_OUT_EXPO } as Transition}
    >
      <motion.div
        animate={{ y: [0, -11, 0] }}
        transition={floatTransition}
        whileHover={{ y: -15, scale: 1.04, transition: { duration: 0.25 } as Transition }}
        className="cursor-default relative"
      >
        {/* Halo glow beneath card */}
        <div
          className="absolute inset-0 rounded-2xl opacity-35"
          style={{
            background: rgba(card.glowRgb, 0.7),
            filter: 'blur(20px)',
            transform: 'translateY(10px) scale(0.85)',
          }}
        />

        {/* Glass border wrapper */}
        <div
          className="relative min-w-[196px] rounded-2xl"
          style={{
            padding: '1px',
            background: `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)`,
          }}
        >
          {/* Card inner */}
          <div
            className="relative rounded-2xl p-4"
            style={{
              background: 'linear-gradient(145deg, rgba(8,13,32,0.94), rgba(14,18,44,0.9))',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
            }}
          >
            {/* Icon + title */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: `linear-gradient(135deg, ${rgba(card.glowRgb, 0.28)}, ${rgba(card.glowRgb, 0.08)})`,
                  border: `1px solid ${rgba(card.glowRgb, 0.45)}`,
                  color: '#fff',
                }}
              >
                {card.icon}
              </div>
              <p className="text-[12px] font-semibold text-white/90 leading-snug">{card.title}</p>
            </div>

            {/* Price */}
            <p className="text-[11px] mb-2.5" style={{ color: 'rgba(160,175,210,0.6)' }}>
              Starting from{' '}
              <span
                className="font-bold text-[12px]"
                style={{ color: `rgb(${card.glowRgb})` }}
              >
                {card.price}
              </span>
            </p>

            {/* Status pill */}
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-[4px] rounded-full"
              style={{
                background: rgba(card.glowRgb, 0.12),
                border: `1px solid ${rgba(card.glowRgb, 0.32)}`,
                color: '#b8d0ff',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#4ade80',
                  boxShadow: '0 0 6px #4ade80',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              {card.badge}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StatChip
// ─────────────────────────────────────────────────────────────────────────────
function StatChip({ chip }: { chip: StatChip }) {
  return (
    <motion.div
      className="absolute z-30"
      style={chip.position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: chip.delay, duration: 0.5, ease: 'easeOut' } as Transition}
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: chip.delay } as Transition}
        className="flex items-center gap-2 px-3 py-[7px] rounded-full"
        style={{
          background: 'rgba(6,10,26,0.90)',
          border: '1px solid rgba(255,255,255,0.13)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        }}
      >
        <span className="text-blue-400">{chip.icon}</span>
        <span className="font-bold text-white text-[12px]">{chip.value}</span>
        <span className="text-[10.5px]" style={{ color: 'rgba(160,180,220,0.6)' }}>{chip.label}</span>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BrowserMockup
// ─────────────────────────────────────────────────────────────────────────────
function BrowserMockup() {
  return (
    <motion.div
      className="absolute"
      style={{ width: 350, top: '50%', left: '50%' }}
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.9, ease: EASE_OUT_EXPO } as Transition}
    >
      {/* Hover float */}
      <motion.div
        animate={{ y: [0, -11, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' } as Transition}
        style={{
          transform: 'translate(-56%, -52%) perspective(1100px) rotateY(8deg) rotateX(4deg)',
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #3b6eff, #7b45f5)',
            filter: 'blur(28px)',
            opacity: 0.22,
            transform: 'translateY(18px) scale(0.88)',
          }}
        />

        {/* Frame */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(7,11,30,0.96)',
            border: '1px solid rgba(80,120,255,0.28)',
            boxShadow: '0 28px 90px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Chrome bar */}
          <div
            className="flex items-center gap-2 px-4"
            style={{
              height: 36,
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex gap-[5px]">
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <span key={c} className="w-[9px] h-[9px] rounded-full" style={{ background: c, opacity: 0.8 }} />
              ))}
            </div>
            <div
              className="flex-1 mx-3 flex items-center gap-1.5 px-2.5 rounded-md"
              style={{
                height: 20,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <ShieldCheck size={9} className="text-green-400 opacity-80 flex-shrink-0" />
              <div className="h-[5px] w-28 rounded-full" style={{ background: 'rgba(255,255,255,0.11)' }} />
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-5 h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
              ))}
            </div>
          </div>

          {/* Page content */}
          <div className="p-4 space-y-3">
            {/* Nav */}
            <div className="flex items-center justify-between">
              <div className="h-[7px] w-[68px] rounded-full" style={{ background: 'rgba(255,255,255,0.22)' }} />
              <div className="flex gap-2">
                {[44, 34, 34, 34].map((w, i) => (
                  <div key={i} className="h-[5px] rounded-full" style={{ width: w, background: 'rgba(255,255,255,0.09)' }} />
                ))}
              </div>
            </div>

            {/* Hero block */}
            <div
              className="rounded-xl p-4 space-y-2"
              style={{
                background: 'linear-gradient(135deg, rgba(59,110,255,0.17), rgba(120,60,255,0.11))',
                border: '1px solid rgba(80,120,255,0.14)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="h-[5px] w-12 rounded-full" style={{ background: 'rgba(99,160,255,0.6)' }} />
              </div>
              <div className="h-[9px] w-[62%] rounded-full" style={{ background: 'rgba(255,255,255,0.55)' }} />
              <div className="h-[7px] w-[78%] rounded-full" style={{ background: 'rgba(255,255,255,0.28)' }} />
              <div className="h-[6px] w-[50%] rounded-full" style={{ background: 'rgba(255,255,255,0.16)' }} />
              <div className="flex gap-2 pt-1.5">
                <div
                  className="h-[22px] w-[72px] rounded-lg"
                  style={{ background: 'linear-gradient(90deg, rgba(59,110,255,0.65), rgba(120,60,255,0.55))' }}
                />
                <div
                  className="h-[22px] w-[56px] rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
                />
              </div>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  'rgba(59,130,246,0.14)',
                  'rgba(139,92,246,0.14)',
                  'rgba(16,185,129,0.14)',
                ] as const
              ).map((bg, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2.5 space-y-1.5"
                  style={{ background: bg, border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-5 h-5 rounded-md" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.35)', width: '70%' }} />
                  <div className="h-[4px] rounded-full" style={{ background: 'rgba(255,255,255,0.14)', width: '90%' }} />
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-3">
                {[48, 38, 38].map((w, i) => (
                  <div key={i} className="h-[5px] rounded-full" style={{ width: w, background: 'rgba(255,255,255,0.07)' }} />
                ))}
              </div>
              <div
                className="h-[17px] w-[56px] rounded-md flex items-center justify-center"
                style={{ background: 'rgba(59,130,246,0.28)', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <div className="h-[4px] w-8 rounded-full" style={{ background: 'rgba(255,255,255,0.55)' }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PhoneMockup
// ─────────────────────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div
      className="absolute z-10"
      style={{ bottom: 18, right: 8, width: 118 }}
      initial={{ opacity: 0, x: 24, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8, ease: EASE_OUT_EXPO } as Transition}
    >
      <motion.div
        animate={{ y: [0, -13, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 } as Transition}
      >
        {/* Halo */}
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: 'linear-gradient(135deg, #7b45f5, #c056ff)',
            filter: 'blur(22px)',
            opacity: 0.22,
            transform: 'translateY(14px) scale(0.82)',
          }}
        />

        {/* Frame */}
        <div
          className="relative rounded-[28px] overflow-hidden"
          style={{
            background: 'rgba(5,8,24,0.97)',
            border: '1px solid rgba(120,80,255,0.32)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)',
            height: 228,
          }}
        >
          {/* Dynamic island */}
          <div className="flex justify-center pt-3 mb-2.5">
            <div className="w-[42px] h-[13px] rounded-full" style={{ background: 'rgba(0,0,0,0.95)' }} />
          </div>

          <div className="px-3 space-y-2.5">
            {/* Status */}
            <div className="flex justify-between items-center">
              <div className="h-[4px] w-9 rounded-full" style={{ background: 'rgba(255,255,255,0.22)' }} />
              <div className="flex gap-1">
                {[9, 6, 6].map((w, i) => (
                  <div key={i} className="h-[4px] rounded-full" style={{ width: w, background: 'rgba(255,255,255,0.18)' }} />
                ))}
              </div>
            </div>

            {/* App hero */}
            <div
              className="rounded-xl p-2.5 space-y-1.5"
              style={{
                background: 'linear-gradient(135deg, rgba(100,60,255,0.24), rgba(180,60,255,0.14))',
                border: '1px solid rgba(140,80,255,0.2)',
              }}
            >
              <div className="h-[6px] w-3/4 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }} />
              <div className="h-[4px] w-full rounded-full" style={{ background: 'rgba(255,255,255,0.22)' }} />
              <div className="h-[16px] w-[56px] rounded-lg mt-1" style={{ background: 'rgba(120,60,255,0.55)' }} />
            </div>

            {/* 2-col cards */}
            <div className="grid grid-cols-2 gap-1.5">
              {['rgba(59,110,255,0.2)', 'rgba(16,185,129,0.2)'].map((bg, i) => (
                <div
                  key={i}
                  className="rounded-xl p-2 space-y-1"
                  style={{ background: bg, border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.38)', width: '70%' }} />
                  <div className="h-[4px] rounded-full" style={{ background: 'rgba(255,255,255,0.15)', width: '90%' }} />
                </div>
              ))}
            </div>

            {/* Bottom nav */}
            <div
              className="flex justify-around items-center rounded-full px-3 py-[6px]"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-[18px] h-[18px] rounded-md"
                  style={{
                    background: i === 1 ? 'rgba(100,80,255,0.55)' : 'rgba(255,255,255,0.07)',
                    border: i === 1 ? '1px solid rgba(140,100,255,0.4)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mouse parallax hook
// ─────────────────────────────────────────────────────────────────────────────
function useParallaxMouse(strength = 6) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 55, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-strength, strength]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { rotateX, rotateY, handleMouse, resetMouse };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero — main export
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { rotateX, rotateY, handleMouse, resetMouse } = useParallaxMouse(6);

  useEffect(() => { setIsMounted(true); }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#020409' }}
    >

      {/* ── Background ──────────────────────────────── */}

      {/* Noise grain */}
      <div
        className="absolute inset-0 z-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Mesh gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 5% 15%, rgba(37,99,235,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 95% 85%, rgba(109,40,217,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 60% 50%, rgba(10,14,35,0.85) 0%, transparent 70%)
          `,
        }}
      />

      {/* Animated orbs */}
      <GlowOrb className="-top-28 -left-28 z-0" size={500} color="rgba(37,99,235,0.14)" delay={0} />
      <GlowOrb className="-bottom-36 -right-20 z-0" size={400} color="rgba(109,40,217,0.12)" delay={2} />
      <GlowOrb className="top-1/3 right-1/3 z-0" size={230} color="rgba(0,200,160,0.07)" delay={4} />

      {/* Fine grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 30%, black 15%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 30%, black 15%, transparent 100%)',
        }}
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center min-h-[calc(100vh-10rem)]">

          {/* ══ LEFT ══ */}
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate={isMounted ? 'visible' : 'hidden'}
          >

            {/* Live badge */}
            <motion.div variants={fadeUpVariants} className="mb-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(99,140,255,0.28)',
                  backdropFilter: 'blur(14px)',
                  color: '#8ab4ff',
                  width: 'fit-content',
                }}
              >
                <span
                  className="w-[7px] h-[7px] rounded-full"
                  style={{
                    background: '#4f8eff',
                    boxShadow: '0 0 8px rgba(79,142,255,0.9)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
                <ShieldCheck size={13} className="opacity-80" />
                Next-Gen Digital Agency · Est. 2020
              </div>
            </motion.div>

            {/* Accent line */}
            <motion.div variants={fadeInVariants} className="mb-6">
              <div
                className="w-10 h-[3px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #4f8eff, #9b6fff)' }}
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUpVariants}
              className="mb-6 font-extrabold tracking-tight leading-[1.07]"
              style={{ fontSize: 'clamp(36px, 5vw, 58px)', color: '#fff', letterSpacing: '-0.03em' }}
            >
              Transform Your Ideas
              <br />
              Into{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #5b96ff 0%, #9b70ff 45%, #d066ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Powerful Websites
              </span>
              <br />
              &amp; Applications
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUpVariants}
              className="mb-10 max-w-[530px]"
              style={{
                fontSize: 'clamp(14px, 1.35vw, 15.5px)',
                lineHeight: 1.8,
                color: 'rgba(178,190,215,0.78)',
                fontWeight: 400,
              }}
            >
              We build modern websites, landing pages, business platforms, and custom
              applications designed to help businesses grow faster, look more professional,
              and convert more customers.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-3 mb-10">

              {/* Primary */}
              <motion.button
                className="group relative flex items-center gap-2.5 px-7 py-[14px] rounded-[14px] font-semibold text-[14px] text-white overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #3d6eff 0%, #7b45f5 100%)',
                  boxShadow: '0 0 28px rgba(80,120,255,0.38), 0 4px 20px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 52px rgba(80,120,255,0.62), 0 8px 32px rgba(0,0,0,0.5)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 } as Transition}
              >
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.17) 50%, transparent 65%)',
                    backgroundSize: '220% 100%',
                  }}
                  animate={{ backgroundPosition: ['220% 0', '-220% 0'] }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 2,
                  } as Transition}
                />
                <Sparkles size={14} className="relative z-10 opacity-80" />
                <span className="relative z-10">Start Your Project</span>
                <span
                  className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.16)' }}
                >
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </span>
              </motion.button>

              {/* Secondary */}
              <motion.button
                className="group flex items-center gap-2 px-7 py-[14px] rounded-[14px] font-semibold text-[14px] cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.11)',
                  backdropFilter: 'blur(12px)',
                  color: 'rgba(208,220,255,0.88)',
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 } as Transition}
              >
                View Portfolio
                <ExternalLink
                  size={13}
                  className="opacity-55 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </motion.button>
            </motion.div>

            {/* Trust bar */}
            <motion.div variants={fadeInVariants}>
              <div
                className="flex flex-wrap gap-x-4 gap-y-3 pt-7"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                {TRUST_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: 'rgba(165,182,215,0.72)' }}
                    >
                      {item.text}
                    </span>
                    {i < TRUST_ITEMS.length - 1 && (
                      <span
                        className="hidden sm:block w-px h-[13px] ml-2.5"
                        style={{ background: 'rgba(255,255,255,0.11)' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT — 3D scene ══ */}
          <motion.div
            className="relative"
            style={{ height: 520, perspective: 1200 }}
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 } as Transition}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
              {/* Central glow */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 300,
                  height: 300,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-56%, -50%)',
                  background: 'radial-gradient(circle, rgba(59,90,255,0.09) 0%, transparent 70%)',
                  filter: 'blur(44px)',
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              />

              <BrowserMockup />
              <PhoneMockup />

              {STAT_CHIPS.map((chip, i) => (
                <StatChip key={i} chip={chip} />
              ))}

              {SERVICE_CARDS.map((card, i) => (
                <FloatingServiceCard key={card.id} card={card} index={i} />
              ))}

              {/* Decorative SVG lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.18 }}
              >
                <defs>
                  <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b6eff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b6eff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7b45f5" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lg2" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7b45f5" stopOpacity="0" />
                    <stop offset="50%" stopColor="#7b45f5" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b6eff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 70 110 Q 195 265 320 195" stroke="url(#lg1)" strokeWidth="0.9" fill="none" strokeDasharray="4 7" />
                <path d="M 305 135 Q 368 295 255 405" stroke="url(#lg2)" strokeWidth="0.9" fill="none" strokeDasharray="3 9" />
              </svg>

              {/* Verified chip */}
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 } as Transition}
              >
                <div
                  className="flex items-center gap-2 px-4 py-[7px] rounded-full text-[11px] font-medium"
                  style={{
                    background: 'rgba(6,10,26,0.9)',
                    border: '1px solid rgba(60,220,120,0.22)',
                    backdropFilter: 'blur(16px)',
                    color: 'rgba(155,230,185,0.88)',
                  }}
                >
                  <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0" />
                  All projects production-ready &amp; delivered on time
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(2,4,9,0.85), transparent)' }}
      />
    </section>
  );
}