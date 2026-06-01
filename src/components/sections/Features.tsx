'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  emoji: string;
  title: string;
  desc: string;
  accent: string;
  glow: string;
  border: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    emoji: '⚡',
    title: 'Fast Development',
    desc: 'Efficient workflow and structured development process for faster project delivery.',
    accent: '#4F8EF7',
    glow: 'rgba(79,142,247,0.18)',
    border: 'rgba(79,142,247,0.25)',
  },
  {
    emoji: '🎨',
    title: 'Premium UI/UX Design',
    desc: 'Modern, responsive, and visually stunning designs focused on user experience.',
    accent: '#A78BFA',
    glow: 'rgba(167,139,250,0.18)',
    border: 'rgba(167,139,250,0.25)',
  },
  {
    emoji: '📱',
    title: 'Fully Responsive',
    desc: 'Perfect appearance and functionality across desktop, tablet, and mobile devices.',
    accent: '#34D399',
    glow: 'rgba(52,211,153,0.18)',
    border: 'rgba(52,211,153,0.25)',
  },
  {
    emoji: '🚀',
    title: 'High Performance',
    desc: 'Optimized loading speed, clean code structure, and smooth user experience.',
    accent: '#FB923C',
    glow: 'rgba(251,146,60,0.18)',
    border: 'rgba(251,146,60,0.25)',
  },
  {
    emoji: '🔒',
    title: 'Secure & Reliable',
    desc: 'Industry-standard security practices to protect your website and business data.',
    accent: '#F472B6',
    glow: 'rgba(244,114,182,0.18)',
    border: 'rgba(244,114,182,0.25)',
  },
  {
    emoji: '🤖',
    title: 'AI-Powered Solutions',
    desc: 'Integrate AI chatbots, automation systems, and intelligent business tools.',
    accent: '#38BDF8',
    glow: 'rgba(56,189,248,0.18)',
    border: 'rgba(56,189,248,0.25)',
  },
  {
    emoji: '📈',
    title: 'SEO Optimized',
    desc: 'Built with SEO best practices to improve visibility on search engines.',
    accent: '#4ADE80',
    glow: 'rgba(74,222,128,0.18)',
    border: 'rgba(74,222,128,0.25)',
  },
  {
    emoji: '⚙️',
    title: 'Scalable Architecture',
    desc: 'Flexible systems that can grow alongside your business needs.',
    accent: '#FBBF24',
    glow: 'rgba(251,191,36,0.18)',
    border: 'rgba(251,191,36,0.25)',
  },
  {
    emoji: '💬',
    title: 'WhatsApp Integration',
    desc: 'Direct communication with customers through seamless WhatsApp integration.',
    accent: '#4ADE80',
    glow: 'rgba(74,222,128,0.18)',
    border: 'rgba(74,222,128,0.25)',
  },
  {
    emoji: '🛠',
    title: 'Easy Management',
    desc: 'User-friendly admin dashboard for managing content and business operations.',
    accent: '#94A3B8',
    glow: 'rgba(148,163,184,0.18)',
    border: 'rgba(148,163,184,0.25)',
  },
  {
    emoji: '☁️',
    title: 'Cloud Ready',
    desc: 'Modern deployment architecture with reliable cloud infrastructure.',
    accent: '#60A5FA',
    glow: 'rgba(96,165,250,0.18)',
    border: 'rgba(96,165,250,0.25)',
  },
  {
    emoji: '🎯',
    title: 'Conversion Focused',
    desc: 'Designed to increase leads, inquiries, sales, and customer engagement.',
    accent: '#F87171',
    glow: 'rgba(248,113,113,0.18)',
    border: 'rgba(248,113,113,0.25)',
  },
];

const stats: Stat[] = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction' },
  { value: 5,   suffix: 'x', label: 'Average ROI' },
  { value: 24,  suffix: '/7', label: 'Support Available' },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 1800, started: boolean = false): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;

    const step = (timestamp: number): void => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

// ─── StatCounter ──────────────────────────────────────────────────────────────

function StatCounter({ value, suffix, label, started }: StatCounterProps) {
  const count = useCountUp(value, 1600, started);

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#fff',
          fontFamily: "'Sora', sans-serif",
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.45)',
          marginTop: '6px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase' as CSSProperties['textTransform'],
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── FeatureCard ──────────────────────────────────────────────────────────────

function FeatureCard({ feature, index }: FeatureCardProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '20px',
        padding: '1.75rem',
        cursor: 'default',
        background: hovered
          ? 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
          : 'rgba(255,255,255,0.015)',
        border: `1px solid ${hovered ? feature.border : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? `0 0 0 1px ${feature.border}, 0 8px 32px ${feature.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : '0 1px 0 rgba(255,255,255,0.03) inset',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: visible
          ? hovered
            ? 'translateY(-6px) scale(1.015)'
            : 'translateY(0) scale(1)'
          : 'translateY(28px) scale(0.97)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${(index % 4) * 55}ms` : '0ms',
        overflow: 'hidden',
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: feature.glow,
          filter: 'blur(30px)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          borderRadius: '14px',
          background: hovered ? feature.glow : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? feature.border : 'rgba(255,255,255,0.07)'}`,
          fontSize: '1.4rem',
          marginBottom: '1.1rem',
          transition: 'all 0.35s ease',
          transform: hovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
        }}
      >
        {feature.emoji}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
          margin: '0 0 0.5rem',
          letterSpacing: '-0.02em',
          fontFamily: "'Sora', sans-serif",
          transition: 'color 0.3s ease',
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.85rem',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.42)',
          margin: 0,
        }}
      >
        {feature.desc}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          width: '60%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
          opacity: hovered ? 0.7 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState<boolean>(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 600px) {
          .stats-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <section
        style={{
          background: '#080810',
          minHeight: '100vh',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Background orbs */}
        {[
          { top: '-200px', left: '-100px', w: '600px', h: '600px', color: 'rgba(79,142,247,0.06)' },
          { top: '30%',    right: '-150px', w: '500px', h: '500px', color: 'rgba(167,139,250,0.05)' },
          { bottom: '10%', left: '30%',    w: '400px', h: '400px', color: 'rgba(52,211,153,0.04)' },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...orb,
              width: orb.w,
              height: orb.h,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              pointerEvents: 'none',
            } as CSSProperties}
          />
        ))}

        {/* Grid texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '100px',
                border: '1px solid rgba(79,142,247,0.25)',
                background: 'rgba(79,142,247,0.06)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'rgba(110,170,255,0.95)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as CSSProperties['textTransform'],
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#4F8EF7',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }}
              />
              Our Capabilities
            </div>
          </div>

          {/* Title */}
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              margin: '0 0 1.25rem',
              fontFamily: "'Sora', sans-serif",
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.65) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Why Clients
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #4F8EF7, #A78BFA, #34D399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Choose Us
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              textAlign: 'center',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'rgba(255,255,255,0.42)',
              maxWidth: '540px',
              margin: '0 auto 4.5rem',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            We don&apos;t just build websites and applications. We create digital experiences that help
            businesses grow, look professional, and convert more customers.
          </p>

          {/* Stats */}
          <div
            ref={statsRef}
            className="stats-responsive"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '4.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '2rem 1rem',
                  background: '#080810',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {i < stats.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '20%',
                      height: '60%',
                      width: '1px',
                      background: 'rgba(255,255,255,0.06)',
                    }}
                  />
                )}
                <StatCounter {...stat} started={statsStarted} />
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '1rem',
              marginBottom: '4rem',
            }}
          >
            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} />
            ))}
          </div>

          {/* Bottom Banner */}
          <div
            style={{
              borderRadius: '24px',
              padding: 'clamp(1.75rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)',
              background:
                'linear-gradient(135deg, rgba(79,142,247,0.08) 0%, rgba(167,139,250,0.08) 50%, rgba(52,211,153,0.06) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap' as CSSProperties['flexWrap'],
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(79,142,247,0.04), rgba(167,139,250,0.04), rgba(52,211,153,0.04))',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1.3rem' }}>💎</span>
                <span
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Built to grow your business.
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.4)',
                  margin: 0,
                  maxWidth: '480px',
                  lineHeight: 1.6,
                }}
              >
                Everything is built with performance, scalability, security, and business growth in mind.
              </p>
            </div>

            <button
              style={{
                position: 'relative',
                padding: '0.75rem 1.75rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #4F8EF7 0%, #A78BFA 100%)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                fontFamily: "'Sora', sans-serif",
                boxShadow: '0 4px 20px rgba(79,142,247,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                whiteSpace: 'nowrap' as CSSProperties['whiteSpace'],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,142,247,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(79,142,247,0.3)';
              }}
            >
              Start a Project →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}